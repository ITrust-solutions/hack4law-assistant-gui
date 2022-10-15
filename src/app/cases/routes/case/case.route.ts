import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shell/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { WithDestroy } from '@loa/utils';
import { SingleCaseProvider } from '../../services/single-case.provider';
import { map, switchMap, takeUntil } from 'rxjs';
import { Case } from '../../model/case';
import { JsonPipe, NgIf } from '@angular/common';
import { MyCasesStubService } from '../../services/stub/my-cases-stub.service';

@Component({
    standalone: true,
    selector: 'loa-case-route',
    templateUrl: 'case.route.html',
    styleUrls: ['./case.route.scss'],
    imports: [
        HeaderComponent,
        NgIf,
        JsonPipe
    ],
    providers: [
        { provide: SingleCaseProvider, useClass: MyCasesStubService }
    ]
})
export class CaseRoute extends WithDestroy() implements OnInit {


    currentCase: Case | undefined;

    constructor(protected readonly activatedRoute: ActivatedRoute,
                protected readonly caseProvider: SingleCaseProvider) {
        super();
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id') || ''),
            switchMap((id) => this.caseProvider.getSingleCase(id)),
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (currentCase) => this.currentCase = currentCase,
        })
    }

}