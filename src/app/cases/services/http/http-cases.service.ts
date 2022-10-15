import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, throwError } from 'rxjs';
import { CasesProvider } from '../cases.provider';
import { Case } from '../../model/case';
import { HttpClient } from '@angular/common/http';
import { CaseDTO } from './dto/case.dto';
import { CaseStatus } from '../../model/case-status';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';
import { CaseType } from '../../model/case-type';
import { CaseTypeDTO } from './dto/case-type.dto';
import { StartCaseProvider } from '../start-case.provider';
import { StartCase } from '../../model/start-case';
import { StartCaseDto } from './dto/start-case.dto';
import { CaseTaskStatus } from '../../model/case-task-status';
import { AssignCaseProvider } from '../assign-case.provider';
import { User } from '../../../user/model/user';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class HttpCasesService implements CasesProvider, SingleCaseProvider, CaseTypesProvider, StartCaseProvider, AssignCaseProvider {

    protected readonly baseUrl = 'https://hack4law-assistant-service.wittysea-0637102a.westeurope.azurecontainerapps.io/api';

    constructor(protected readonly httpClient: HttpClient) {
    }

    startCase(caseToStart: StartCase): Observable<void> {
        const caseToCreate: StartCaseDto = this.mapToCaseDTO(caseToStart);
        return this.httpClient.post<void>(`${this.baseUrl}/assistant/cases/createCase/`, caseToCreate);
    }

    getAllCases(): Observable<Case[]> {
        return this.httpClient.get<CaseDTO[]>(`${this.baseUrl}/assistant/cases/findAllCases`).pipe(
            map(dtos => dtos.map(dto => this.mapToCase(dto)))
        );
    }

    getSingleCase(searchedId: string): Observable<Case> {
        return this.getAllCases().pipe(
            map((cases) => cases.find(({ id }) => `${id}` === searchedId)),
            mergeMap((foundCase) => foundCase ? of(foundCase) : throwError(() => SingleCaseProvider.CASE_NOT_FOUND)),
        );
    }

    getCaseTypes(): Observable<CaseType[]> {
        return this.httpClient.get<CaseTypeDTO[]>(`${this.baseUrl}/assistant/cases/findAllCaseDefinitions`).pipe(
            map(dtos => dtos.map(dto => this.mapToType(dto))),
        );
    }

    assignUserToCase(cCase: Case, user: User): Observable<void> {
        const caseDTO: UpdateCaseDto = {
            caseNumber: cCase.no,
            deadlineDate: cCase.deadline ? this.mapDate(cCase.deadline) : '',
            helpingUser: '',
            caseStatus: cCase.status,
            description: cCase.description,
            receiptDate: cCase.receiptDate ? this.mapDate(cCase.receiptDate) : '',
            assignedUser: user.login,
        };
        return this.httpClient.put<void>(`${this.baseUrl}/assistant/cases/updateById/${cCase.id}`, caseDTO);
    }


    private mapDate(date: Date): string {
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth()+1}`;
        const day = date.getDay() < 9 ? `0${date.getDay() + 1}` : `${date.getDay() +1}`;
        return `${date.getFullYear()}-${month}-${day}`;
    }

    private mapToCaseDTO(startCase: StartCase): StartCaseDto {
        return {
            key: 'Wniosek',
            caseStatus: CaseStatus.NEW,
            description: startCase.description,
            receiptDate: this.mapDate(startCase.receiptDate!),
            caseNumber: startCase.no,
            deadlineDate: this.mapDate(startCase.deadline!),
            caseDefinitionId: +startCase.type.id,
            assignedUser: '',
            filesList: [],
            helpingUser: '',
            notesList: [],
            caseTaskDtoList: startCase.type.steps.map((step) => ({ caseDefinitionId: +startCase.type.id, caseStepDefinitionId: +step.id, taskStatus: CaseTaskStatus.NEW })),
        }
    }

    private mapToType(dto: Partial<CaseTypeDTO>): CaseType {
        return {
            id: `${dto.id}` || '',
            name: dto.name || '',
            steps: (dto.caseStepDefinitionDtoList || []).map((stepDTO) => ({
                id: `${stepDTO.id}`,
                name: stepDTO.name || '',
                key: stepDTO.key || ''
            }))
        }
    }

    private mapToCase(dto: Partial<CaseDTO>): Case {
        return {
            no: dto.caseNumber || '',
            id: `${dto.id}` || '',
            deadline: dto.deadlineDate ? new Date(dto.deadlineDate) : undefined,
            receiptDate: dto.receiptDate ? new Date(dto.receiptDate) : undefined,
            finishDate: dto.finishDate ? new Date(dto.finishDate) : undefined,
            type: `${dto.caseType}` || '',
            description: dto.description || '',
            status: dto.caseStatus || CaseStatus.NEW,
            tasks: (dto.caseTaskDtoList || []).map((taskDto) => ({ id: taskDto.id, status: taskDto.taskStatus, description: taskDto.name })),
            assignedUser: dto.assignedUser || '',
        }
    }
}
