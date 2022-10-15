import { Injectable } from '@angular/core';
import { GetKsefInvoiceProvider } from '../get-ksef-invoice.provider';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Injectable()
export class HttpKsefService implements GetKsefInvoiceProvider {
    protected readonly baseUrl = 'https://hack4law-assistant-service.wittysea-0637102a.westeurope.azurecontainerapps.io/api';

    constructor(protected readonly httpClient: HttpClient) {
    }

    getKsefInvoice(invoiceNumber: string): Observable<void> {
        return this.httpClient.get(`${this.baseUrl}/ksef/getInvoiceXml/${invoiceNumber}`, {
            responseType: 'blob'
        }).pipe(
            map((file) => {
                FileSaver.saveAs(file, "Faktura.xml")
            }),
        );
    }

}