import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CaseStatusPipe } from '../../pipes/case-status.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CaseColumn } from './case-column';
import { Case } from '../../model/case';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DefaultCaseColumns } from './default-case-columns';

@Component({
    standalone: true,
    selector: 'loa-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss'],
    imports: [
        DatePipe,
        CaseStatusPipe,
        MatTableModule,
        MatSortModule
    ]
})
export class CaseListComponent implements AfterViewInit {

    casesDatasource: MatTableDataSource<Case> = new MatTableDataSource<Case>([]);

    @ViewChild(MatSort) sort: MatSort | null = null;
    @Input() displayedColumns: CaseColumn[] = DefaultCaseColumns;
    @Input() set data(cases: Case[]) {
        cases = cases || [];
        this.casesDatasource.data = cases;
    };

    @Output() caseSelected = new EventEmitter<Case>();

    ngAfterViewInit(): void {
        this.casesDatasource.sort = this.sort;
    }

    emitSelectedCase(selectedCase: Case): void {
        this.caseSelected.emit(selectedCase);
    }
}