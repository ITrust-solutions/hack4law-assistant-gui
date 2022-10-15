import { NgModule } from '@angular/core';
import { MyCasesStubService } from './my-cases-stub.service';
import { MyCasesProvider } from '../my-cases.provider';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';

@NgModule({
    providers: [
        MyCasesStubService,
        { provide: MyCasesProvider, useExisting: MyCasesStubService },
        { provide: SingleCaseProvider, useExisting: MyCasesStubService },
        { provide: CaseTypesProvider, useExisting: MyCasesStubService },
    ]
})
export class StubModule {

}
