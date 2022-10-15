import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { MyCasesEventsProvider } from '../../../services/my-cases-events.provider';
import { WithDestroy } from '@loa/utils';
import { takeUntil } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'loa-my-calendar',
    imports: [
        CalendarModule,
        NgIf,
        NgForOf,
    ],
    templateUrl: './my-calendar.component.html',
    styleUrls: ['./my-calendar.component.scss'],
    providers: [
        MyCasesEventsProvider,
    ]
})
export class MyCalendarComponent extends WithDestroy() implements OnInit {

    viewDate = new Date();
    events: CalendarEvent[] = [];

    constructor(protected myCasesEventsProvide: MyCasesEventsProvider) {
        super();
    }

    ngOnInit(): void {
        this.myCasesEventsProvide.getMyCasesEvents().pipe(
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (casesEvents) => this.events = casesEvents,
            error: () => this.events = [],
        })
    }
}