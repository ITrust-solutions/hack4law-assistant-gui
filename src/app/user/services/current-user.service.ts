import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmptyUser } from '../model/empty-user';
import { User } from '../model/user';

@Injectable()
export class CurrentUserService {
    private readonly _currentUser = new BehaviorSubject<User>(EmptyUser);

    setCurrentUser(user: User): void {
        this._currentUser.next(user);
    }

    getCurrentUser(): User {
        return this._currentUser.value;
    }

    getCurrentUserChanges(): Observable<User> {
        return this._currentUser.asObservable();
    }
}