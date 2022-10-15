import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [
        QRCodeModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    selector: 'loa-qr-code-dialog',
    templateUrl: './download-ksef-dialog.component.html',
    styleUrls: ['./download-ksef-dialog.component.scss'],
})
export class DownloadKsefDialogComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<DownloadKsefDialogComponent>) {
        this.form = this.fb.group({
            invoiceNumber: [''],
        });
    }

    downloadInvoice() {
        this.dialogRef.close(this.form.get('invoiceNumber')?.value)
    }
}