import { CalendarEvent } from 'angular-calendar';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CasesProvider } from './cases.provider';
import { Case } from '../model/case';

@Injectable()
export class MyCasesEventsProvider {
    constructor(protected readonly myCasesProvider: CasesProvider) {
    }

    getMyCasesEvents(): Observable<CalendarEvent[]> {
        return this.myCasesProvider.getAllCases().pipe(
            map((cases) => this.mapCasesToEvents(cases)),
        )
    }

    private mapCasesToEvents(cases: Case[]): CalendarEvent[] {
        return cases.reduce((events, nextCase) => [...events, ...this.mapCaseToEvents(nextCase)], [] as CalendarEvent[]);
    }

    private mapCaseToEvents(mappedCase: Case): CalendarEvent[] {
        return mappedCase.deadline ? [
            { title: mappedCase.no, start: mappedCase.deadline, end: mappedCase.deadline },
        ] : [];
    }
}