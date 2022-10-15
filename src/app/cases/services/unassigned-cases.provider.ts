import { Case } from '../model/case';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CasesProvider } from './cases.provider';

@Injectable()
export class UnassignedCasesProvider {
    constructor(protected readonly casesProvider: CasesProvider) {
    }

    getUnassignedCases(): Observable<Case[]> {
        return this.casesProvider.getAllCases().pipe(
            map((cases) => cases.filter((cCase) => !!cCase.assignedUser))
        )
    };
}