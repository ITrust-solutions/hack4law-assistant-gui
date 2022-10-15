import { Observable } from 'rxjs';
import { Case } from '../model/case';

export abstract class SingleCaseProvider {
    public static readonly CASE_NOT_FOUND = 'CASE_NOT_FOUND';

    abstract getSingleCase(id: string): Observable<Case>;
}