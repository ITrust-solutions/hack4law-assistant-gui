import { Observable } from 'rxjs';
import { Case } from '../model/case';

export abstract class MyCasesProvider {
    abstract getMyCases(): Observable<Case[]>;
}