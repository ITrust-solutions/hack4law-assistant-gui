import { Component, Inject } from '@angular/core';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { QrDialogData } from './qr-dialog-data';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    imports: [
        QRCodeModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
    ],
    selector: 'loa-qr-code-dialog',
    templateUrl: './qr-code-dialog.component.html',
    styleUrls: ['./qr-code-dialog.component.scss'],
})
export class QrCodeDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public readonly data: QrDialogData) {
    }

    downloadQR(component: QRCodeComponent) {
        let parentElement = null

        if (component.elementType === "canvas") {
            parentElement = component.qrcElement.nativeElement
                .querySelector('canvas')
                .toDataURL('image/png')
        } else if (component.elementType === 'img' || component.elementType === 'url') {
            parentElement = component.qrcElement.nativeElement.querySelector('img').src;
        }

        if (parentElement) {
            let blobData = this.convertBase64ToBlob(parentElement)
            const blob = new Blob([blobData], { type: 'image/png' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${this.data.downloadedFileName}.png`;
            link.click()
        }
    }

    private convertBase64ToBlob(Base64Image: string) {
        const parts = Base64Image.split(";base64,")
        const imageType = parts[0].split(":")[1]
        const decodedData = window.atob(parts[1])
        const uInt8Array = new Uint8Array(decodedData.length)
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i)
        }
        return new Blob([uInt8Array], { type: imageType })
    }
}