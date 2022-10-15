import { Case } from '../model/case';
import { Observable } from 'rxjs';
import { User } from '../../user/model/user';

export abstract class AssignCaseProvider {
    abstract assignUserToCase(cCase: Case, user: User): Observable<void>;
}
