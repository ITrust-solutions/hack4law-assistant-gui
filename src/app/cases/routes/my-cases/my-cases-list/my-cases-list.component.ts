import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CasesProvider } from '../../../services/cases.provider';
import { finalize, takeUntil } from 'rxjs';
import { Case } from '../../../model/case';
import { MatTableModule } from '@angular/material/table';
import { WithDestroy } from '@loa/utils';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CaseStatusPipe } from '../../../pipes/case-status.pipe';
import { CaseListComponent } from '../../../components/case-list/case-list.component';

@Component({
    standalone: true,
    selector: 'loa-my-cases-list',
    templateUrl: './my-cases-list.component.html',
    styleUrls: ['./my-cases-list.component.scss'],
    imports: [
        MatTableModule,
        DatePipe,
        MatSortModule,
        CaseStatusPipe,
        CaseListComponent
    ]
})
export class MyCasesListComponent extends WithDestroy() implements OnInit {
    isLoading: boolean = false;

    myCases: Case[] = [];
    @ViewChild(MatSort) sort: MatSort | null;

    @Output() caseSelected = new EventEmitter<Case>();

    constructor(protected readonly casesProvider: CasesProvider) {
        super();
        this.sort = null;
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.casesProvider.getAllCases().pipe(
            finalize(() => this.isLoading = false),
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (cases) => this.myCases = cases,
            error: () => this.myCases = []
        })
    }

    emitSelectedCase(selectedCase: Case): void {
        this.caseSelected.emit(selectedCase);
    }
}