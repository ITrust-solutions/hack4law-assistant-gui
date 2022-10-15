import { Observable } from 'rxjs';

export abstract class GetKsefInvoiceProvider {
    abstract getKsefInvoice(invoiceNumber: string): Observable<void>;
}