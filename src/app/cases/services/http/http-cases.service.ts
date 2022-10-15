import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, throwError } from 'rxjs';
import { MyCasesProvider } from '../my-cases.provider';
import { Case } from '../../model/case';
import { HttpClient } from '@angular/common/http';
import { CaseDTO } from './dto/case.dto';
import { CaseStatus } from '../../model/case-status';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';
import { CaseType } from '../../model/case-type';
import { CaseTypeDTO } from './dto/case-type.dto';

@Injectable()
export class HttpCasesService implements MyCasesProvider, SingleCaseProvider, CaseTypesProvider {

    protected readonly baseUrl = 'https://hack4law-assistant-service.wittysea-0637102a.westeurope.azurecontainerapps.io/api';

    constructor(protected readonly httpClient: HttpClient) {
    }

    getMyCases(): Observable<Case[]> {
        return this.httpClient.get<CaseDTO[]>(`${this.baseUrl}/assistant/cases/findAllCases`).pipe(
            map(dtos => dtos.map(dto => this.mapToCase(dto)))
        );
    }

    getSingleCase(searchedId: string): Observable<Case> {
        return this.getMyCases().pipe(
            map((cases) => cases.find(({ id }) => `${id}` === searchedId)),
            mergeMap((foundCase) => foundCase ? of(foundCase) : throwError(() => SingleCaseProvider.CASE_NOT_FOUND)),
        );
    }

    getCaseTypes(): Observable<CaseType[]> {
        return this.httpClient.get<CaseTypeDTO[]>(`${this.baseUrl}/assistant/cases/findAllCaseDefinitions`).pipe(
            map(dtos => dtos.map(dto => this.mapToType(dto))),
        );
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
            createDate: dto.receiptDate ? new Date(dto.receiptDate) : undefined,
            finishDate: dto.finishDate ? new Date(dto.finishDate) : undefined,
            type: dto.caseType || '',
            description: dto.description || '',
            status: dto.caseStatus || CaseStatus.NEW,
        }
    }
}
