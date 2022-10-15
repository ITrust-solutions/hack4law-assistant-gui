import { Observable } from 'rxjs';
import { CaseType } from '../model/case-type';

export abstract class CaseTypesProvider {
    abstract getCaseTypes(): Observable<CaseType[]>;
}