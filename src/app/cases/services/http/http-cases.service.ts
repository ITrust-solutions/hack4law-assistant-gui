import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, throwError } from 'rxjs';
import { MyCasesProvider } from '../my-cases.provider';
import { Case } from '../../model/case';
import { HttpClient } from '@angular/common/http';
import { CaseDTO } from './dto/case.dto';
import { CaseStatus } from '../../model/case-status';
import { SingleCaseProvider } from '../single-case.provider';

@Injectable()
export class HttpCasesService implements MyCasesProvider, SingleCaseProvider {

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

    private mapToCase(dto: Partial<CaseDTO>): Case {
        return {
            no: dto.caseNumber || '',
            id: dto.id || '',
            deadline: dto.deadlineDate ? new Date(dto.deadlineDate) : undefined,
            createDate: dto.receiptDate ? new Date(dto.receiptDate) : undefined,
            finishDate: dto.finishDate ? new Date(dto.finishDate) : undefined,
            type: dto.caseType || '',
            description: dto.description || '',
            status: dto.caseStatus || CaseStatus.NEW,
        }
    }
}
