import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PickUserDialog } from './pick-user-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
    selector: 'loa-pick-user-dialog',
    standalone: true,
    templateUrl: './pick-user-dialog.component.html',
    styleUrls: ['./pick-user-dialog.component.scss'],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        NgForOf,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class PickUserDialogComponent {

    userFormControl = new FormControl<User | null>(null, Validators.required);

    constructor(@Inject(MAT_DIALOG_DATA) public pickUserDialog: PickUserDialog) {
    }
}