import { Component, OnInit } from '@angular/core';
import { WithDestroy } from '@loa/utils';
import { HeaderComponent } from '../../../shell/header/header.component';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

export type CaseForm = FormGroup<{
    no: FormControl<string>,
    deadline: FormControl<string>,
    type: FormControl<string>,
    description: FormControl<string>;
}>

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
        TileComponent
    ]
})
export class CreateCaseRoute extends WithDestroy() implements OnInit {

    caseGroup: CaseForm;

    caseTypes: CaseType[] = [];

    constructor(protected readonly formBuilder: NonNullableFormBuilder,
                protected readonly caseTypesProvider: CaseTypesProvider) {
        super();
        this.caseTypesProvider.getCaseTypes().pipe(
            takeUntil(this.componentDestroyed)
        ).subscribe({
            next: (types) => this.caseTypes = types
        });

        this.caseGroup = formBuilder.group({
            type: formBuilder.control('', Validators.required),
            deadline: formBuilder.control(''),
            description: formBuilder.control(''),
            no: formBuilder.control('', Validators.required)
        })
    }

    ngOnInit(): void {

    }
}