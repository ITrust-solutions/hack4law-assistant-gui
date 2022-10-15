import { NgModule } from '@angular/core';
import { HttpCasesService } from './http-cases.service';
import { MyCasesProvider } from '../my-cases.provider';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';

@NgModule({
    providers: [
        HttpCasesService,
        { provide: MyCasesProvider, useExisting: HttpCasesService },
        { provide: SingleCaseProvider, useExisting: HttpCasesService },
        { provide: CaseTypesProvider, useExisting: HttpCasesService },
    ]
})
export class HttpModule {

}
