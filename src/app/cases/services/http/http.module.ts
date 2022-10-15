import { NgModule } from '@angular/core';
import { HttpCasesService } from './http-cases.service';
import { CasesProvider } from '../cases.provider';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';
import { StartCaseProvider } from '../start-case.provider';
import { UnassignedCasesProvider } from '../unassigned-cases.provider';

@NgModule({
    providers: [
        HttpCasesService,
        UnassignedCasesProvider,
        { provide: CasesProvider, useExisting: HttpCasesService },
        { provide: SingleCaseProvider, useExisting: HttpCasesService },
        { provide: CaseTypesProvider, useExisting: HttpCasesService },
        { provide: StartCaseProvider, useExisting: HttpCasesService },
    ]
})
export class HttpModule {

}
