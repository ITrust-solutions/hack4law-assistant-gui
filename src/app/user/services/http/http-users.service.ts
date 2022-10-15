import { Injectable } from '@angular/core';
import { BaseHttpService } from '@loa/utils';
import { UsersProvider } from '../users.provider';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class HttpUsersService extends BaseHttpService implements UsersProvider {
    getUsers(): Observable<User[]> {
        return this.httpClient.get<UserDTO[]>(`${this.baseUrl}/assistant/users/findAllUsers/`)
    }
}