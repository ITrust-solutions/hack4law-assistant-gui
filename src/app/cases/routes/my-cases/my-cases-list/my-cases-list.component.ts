import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { finalize, switchMap, takeUntil } from 'rxjs';
import { Case } from '../../../model/case';
import { MatTableModule } from '@angular/material/table';
import { WithDestroy } from '@loa/utils';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CaseStatusPipe } from '../../../pipes/case-status.pipe';
import { CaseListComponent } from '../../../components/case-list/case-list.component';
import { MyCasesProvider } from '../../../services/my-cases.provider';
import { CurrentUserService } from '../../../../user/services/current-user.service';

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

    constructor(protected readonly casesProvider: MyCasesProvider,
                protected readonly userProvider: CurrentUserService) {
        super();
        this.sort = null;
    }

    ngOnInit(): void {
        this.userProvider.getCurrentUserChanges().pipe(
            switchMap(() => this.casesProvider.getMyCases()),
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