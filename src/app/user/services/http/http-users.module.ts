import { HttpUsersService } from './http-users.service';
import { UsersProvider } from '../users.provider';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        HttpUsersService,
        { provide: UsersProvider, useExisting: HttpUsersService }
    ]
})
export class HttpUsersModule {

}