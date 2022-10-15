import { CasesProvider } from './cases.provider';
import { map, Observable } from 'rxjs';
import { Case } from '../model/case';
import { CurrentUserService } from '../../user/services/current-user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MyCasesProvider {
    constructor(protected readonly casesProvider: CasesProvider,
                protected readonly userService: CurrentUserService) {
    }

    getMyCases(): Observable<Case[]> {
        const currentUser = this.userService.getCurrentUser();
        return this.casesProvider.getAllCases().pipe(
            map((cases) => cases.filter(cCase => cCase.assignedUser && (cCase.assignedUser === currentUser.login))),
        );
    }
}