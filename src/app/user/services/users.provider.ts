import { Observable } from 'rxjs';
import { User } from '../model/user';

export abstract class UsersProvider {
    abstract getUsers(): Observable<User[]>;
}