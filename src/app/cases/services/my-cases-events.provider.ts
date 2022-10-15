import { CalendarEvent } from 'angular-calendar';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MyCasesProvider } from './my-cases.provider';
import { Case } from '../model/case';

@Injectable()
export class MyCasesEventsProvider {
    constructor(protected readonly myCasesProvider: MyCasesProvider) {
    }

    getMyCasesEvents(): Observable<CalendarEvent[]> {
        return this.myCasesProvider.getMyCases().pipe(
            map((cases) => this.mapCasesToEvents(cases)),
        )
    }

    private mapCasesToEvents(cases: Case[]): CalendarEvent[] {
        return cases.reduce((events, nextCase) => [...events, ...this.mapCaseToEvents(nextCase)], [] as CalendarEvent[]);
    }

    private mapCaseToEvents(mappedCase: Case): CalendarEvent[] {
        return [
            { title: mappedCase.no, start: mappedCase.deadline, end: mappedCase.deadline },
        ];
    }
}