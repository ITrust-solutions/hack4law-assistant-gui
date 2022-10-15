import { Component, Inject } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        QRCodeModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
    ],
    selector: 'loa-open-case-dialog',
    templateUrl: './open-case-dialog.component.html',
    styleUrls: ['./open-case-dialog.component.scss'],
})
export class OpenCaseDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public readonly data: string,
                private readonly dialogRef: MatDialogRef<OpenCaseDialogComponent>,
                protected readonly router: Router) {

    }
    openCase() {
        this.router.navigate(["/my-cases", this.data])
        this.dialogRef.close(true);
    }
}