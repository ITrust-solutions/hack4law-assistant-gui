import { NgModule } from '@angular/core';
import { HttpCasesService } from './http-cases.service';
import { CasesProvider } from '../cases.provider';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';
import { GetKsefInvoiceProvider } from '../get-ksef-invoice.provider';
import { HttpKsefService } from './http-ksef.service';
import { StartCaseProvider } from '../start-case.provider';
import { UnassignedCasesProvider } from '../unassigned-cases.provider';
import { AssignCaseProvider } from '../assign-case.provider';
import { MyCasesProvider } from '../my-cases.provider';

@NgModule({
    providers: [
        HttpCasesService,
        HttpKsefService,
        UnassignedCasesProvider,
        MyCasesProvider,
        { provide: AssignCaseProvider, useExisting: HttpCasesService },
        { provide: CasesProvider, useExisting: HttpCasesService },
        { provide: SingleCaseProvider, useExisting: HttpCasesService },
        { provide: CaseTypesProvider, useExisting: HttpCasesService },
        { provide: StartCaseProvider, useExisting: HttpCasesService },
        { provide: GetKsefInvoiceProvider, useExisting: HttpKsefService },
    ]
})
export class HttpCasesModule {

}
