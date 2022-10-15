import { NgModule } from '@angular/core';
import { MyCasesStubService } from './my-cases-stub.service';
import { CasesProvider } from '../cases.provider';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';

@NgModule({
    providers: [
        MyCasesStubService,
        { provide: CasesProvider, useExisting: MyCasesStubService },
        { provide: SingleCaseProvider, useExisting: MyCasesStubService },
        { provide: CaseTypesProvider, useExisting: MyCasesStubService },
    ]
})
export class StubModule {

}
