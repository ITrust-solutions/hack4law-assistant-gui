import { Observable } from 'rxjs';
import { Case } from '../model/case';

export abstract class CasesProvider {
    abstract getAllCases(): Observable<Case[]>;
}