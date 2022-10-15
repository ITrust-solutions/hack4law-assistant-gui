import { Component, OnInit } from '@angular/core';
import { UnassignedCasesProvider } from '../../services/unassigned-cases.provider';
import { WithDestroy } from '@loa/utils';
import { Case } from '../../model/case';
import { takeUntil } from 'rxjs';
import { HeaderComponent } from '../../../shell/header/header.component';
import { CaseListComponent } from '../../components/case-list/case-list.component';

@Component({
    standalone: true,
    selector: 'loa-unassigned-cases-route',
    templateUrl: './unassigned-cases.route.html',
    styleUrls: ['./unassigned-cases.route.scss'],
    imports: [
        HeaderComponent,
        CaseListComponent
    ]
})
export class UnassignedCasesRoute extends WithDestroy() implements OnInit {

    cases: Case[] = [];

    constructor(protected readonly unassignedCasesProvider: UnassignedCasesProvider) {
        super();
    }

    ngOnInit(): void {
        this.unassignedCasesProvider.getUnassignedCases().pipe(
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (value) => this.cases = value,
            error: () => this.cases = [],

        })
    }

}