import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shell/header/header.component';
import { CasesProvider } from '../cases/services/cases.provider';
import { Case } from '../cases/model/case';
import { CaseListComponent } from '../cases/components/case-list/case-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultCaseColumns } from '../cases/components/case-list/default-case-columns';
import { CaseColumn } from '../cases/components/case-list/case-column';

@Component({
    standalone: true,
    selector: 'loa-archives-route',
    templateUrl: './archives.route.html',
    imports: [
        HeaderComponent,
        CaseListComponent
    ],
    styleUrls: ['./archives.route.scss']
})
export class ArchivesRoute implements OnInit {

    cases: Case[] = [];
    caseColumns: CaseColumn[] = [...DefaultCaseColumns, 'assignedUser'];

    constructor(protected readonly casesProvider: CasesProvider,
                protected readonly activatedRoute: ActivatedRoute,
                protected readonly router: Router) {
    }

    ngOnInit(): void {
        this.casesProvider.getAllCases().subscribe({
            next: (cases) => this.cases = cases,
        })
    }

    displayCaseDetails(cCase: Case) {
        this.router.navigate([`${cCase.id}`], { relativeTo: this.activatedRoute });
    }
}