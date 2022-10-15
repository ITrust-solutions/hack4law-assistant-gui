import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyValuePipe, NgForOf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'loa-form-errors',
    templateUrl: './form-errors.component.html',
    imports: [
        KeyValuePipe,
        NgForOf
    ],
    styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
    errorMessages: { [key: string]: string } = {
        required: 'To pole jest wymagane'
    };

    @Input() errors?: ValidationErrors | null;
}
