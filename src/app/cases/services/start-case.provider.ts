import { Observable } from 'rxjs';
import { StartCase } from '../model/start-case';

export abstract class StartCaseProvider {
    abstract startCase(caseToStart: StartCase): Observable<void>;
}