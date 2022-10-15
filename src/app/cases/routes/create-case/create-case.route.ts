import { Component, OnInit } from '@angular/core';
import { WithDestroy } from '@loa/utils';
import { HeaderComponent } from '../../../shell/header/header.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { FormErrorsComponent } from '../../../utils/form-errors/form-errors.component';
import { CaseTypesProvider } from '../../services/case-types.provider';
import { takeUntil } from 'rxjs';
import { CaseType } from '../../model/case-type';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TileComponent } from '../../../shell/tile/tile.component';
import { MatButtonModule } from '@angular/material/button';
import { StartCaseProvider } from '../../services/start-case.provider';
import { ModelToForm } from '../../../utils/model-to-form-group';
import { StartCase } from '../../model/start-case';

export type CaseForm = ModelToForm<StartCase>;


export const emptyType: CaseType = {
    id: '',
    steps: [],
    name: '',
};

@Component({
    selector: 'loa-create-case-route',
    standalone: true,
    templateUrl: './create-case.route.html',
    styleUrls: ['./create-case.route.scss'],
    imports: [
        HeaderComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgForOf,
        FormErrorsComponent,
        MatDatepickerModule,
        TileComponent,
        MatButtonModule
    ]
})
export class CreateCaseRoute extends WithDestroy() implements OnInit {

    caseGroup: CaseForm;

    caseTypes: CaseType[] = [];

    constructor(protected readonly formBuilder: NonNullableFormBuilder,
                protected readonly startCaseProvider: StartCaseProvider,
                protected readonly caseTypesProvider: CaseTypesProvider) {
        super();


        this.caseGroup = formBuilder.group({
            no: formBuilder.control('', Validators.required),
            type: formBuilder.control<CaseType>(emptyType, Validators.required),
            receiptDate: formBuilder.control<Date>(new Date(), Validators.required),
            deadline: formBuilder.control<Date>(new Date(), Validators.required),
            description: formBuilder.control(''),
        })
    }

    ngOnInit(): void {
        this.caseTypesProvider.getCaseTypes().pipe(
            takeUntil(this.componentDestroyed)
        ).subscribe({
            next: (types) => this.caseTypes = types
        });
    }

    startCase() {
        this.startCaseProvider.startCase(this.caseGroup.getRawValue()).subscribe({
            next: () => this.caseGroup.reset(),
        })
    }
}