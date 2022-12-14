import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shell/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { WithDestroy } from '@loa/utils';
import { SingleCaseProvider } from '../../services/single-case.provider';
import { map, switchMap, takeUntil } from 'rxjs';
import { Case } from '../../model/case';
import { DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../../../qr/qr-code-dialog/qr-code-dialog.component';
import { QrDialogData } from '../../../qr/qr-code-dialog/qr-dialog-data';
import { TileComponent } from '../../../shell/tile/tile.component';
import { MatChipsModule } from '@angular/material/chips';
import { CaseStatusPipe } from '../../pipes/case-status.pipe';
import { CaseTaskStatusPipe } from '../../pipes/task-status.pipe';
import { GetKsefInvoiceProvider } from '../../services/get-ksef-invoice.provider';
import { DownloadKsefDialogComponent } from '../../../ksef/download-ksef-dialog/download-ksef-dialog.component';

@Component({
    standalone: true,
    selector: 'loa-case-route',
    templateUrl: 'case.route.html',
    styleUrls: ['./case.route.scss'],
    imports: [
        HeaderComponent,
        NgIf,
        JsonPipe,
        MatIconModule,
        MatButtonModule,
        TileComponent,
        MatChipsModule,
        CaseStatusPipe,
        DatePipe,
        NgForOf,
        CaseStatusPipe,
        CaseTaskStatusPipe,
    ]
})
export class CaseRoute extends WithDestroy() implements OnInit {


    currentCase: Case | undefined;

    constructor(protected readonly activatedRoute: ActivatedRoute,
                private readonly dialog: MatDialog,
                protected readonly caseProvider: SingleCaseProvider,
                protected readonly ksefProvider: GetKsefInvoiceProvider) {
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

    openQRDialog(): void {
        if(this.currentCase) {
            const qrDialogData: QrDialogData = {
                qrData: this.currentCase.id,
                downloadedFileName: `${this.currentCase.no}-qr-code`,
                title: `QR Kod Sprawy ${this.currentCase?.no}`
            };
            this.dialog.open(QrCodeDialogComponent, { data: qrDialogData })
        }
    }

    downloadKsefInvoice(): void {
        this.dialog.open(DownloadKsefDialogComponent)
            .afterClosed()
            .subscribe((invoiceNumber) => {
                if (invoiceNumber) {
                    this.ksefProvider.getKsefInvoice(invoiceNumber).subscribe();
                }
            })
    }

}