import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MyCasesProvider } from '../../../services/my-cases.provider';
import { finalize, takeUntil } from 'rxjs';
import { Case } from '../../../model/case';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WithDestroy } from '@loa/utils';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CaseTypePipe } from '../../../pipes/case-type.pipe';

@Component({
    standalone: true,
    selector: 'loa-my-cases-list',
    templateUrl: './my-cases-list.component.html',
    styleUrls: ['./my-cases-list.component.scss'],
    imports: [
        MatTableModule,
        DatePipe,
        CaseTypePipe,
        MatSortModule
    ]
})
export class MyCasesListComponent extends WithDestroy() implements OnInit, AfterViewInit {
    myCases: MatTableDataSource<Case> = new MatTableDataSource<Case>([]);
    isLoading: boolean = false;
    displayedColumns = ['no', 'type', 'name', 'status', 'deadline'];

    @ViewChild(MatSort) sort: MatSort | null;

    @Output() caseSelected = new EventEmitter<Case>();

    constructor(protected readonly casesProvider: MyCasesProvider) {
        super();
        this.sort = null;
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.casesProvider.getMyCases().pipe(
            finalize(() => this.isLoading = false),
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (cases) => this.myCases.data = cases,
            error: () => this.myCases.data = []
        })
    }

    ngAfterViewInit(): void {
        this.myCases.sort = this.sort;
    }

    emitSelectedCase(selectedCase: Case): void {
        this.caseSelected.emit(selectedCase);
    }
}