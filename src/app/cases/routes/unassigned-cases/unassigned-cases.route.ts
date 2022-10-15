import { Component, OnInit } from '@angular/core';
import { UnassignedCasesProvider } from '../../services/unassigned-cases.provider';
import { WithDestroy } from '@loa/utils';
import { Case } from '../../model/case';
import { filter, switchMap, takeUntil } from 'rxjs';
import { HeaderComponent } from '../../../shell/header/header.component';
import { CaseListComponent } from '../../components/case-list/case-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PickUserDialogComponent } from '../../../user/components/pick-user-dialog/pick-user-dialog.component';
import { UsersProvider } from '../../../user/services/users.provider';
import { User } from '../../../user/model/user';
import { PickUserDialog } from '../../../user/components/pick-user-dialog/pick-user-dialog';
import { AssignCaseProvider } from '../../services/assign-case.provider';
import { NgIf } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
    standalone: true,
    selector: 'loa-unassigned-cases-route',
    templateUrl: './unassigned-cases.route.html',
    styleUrls: ['./unassigned-cases.route.scss'],
    imports: [
        HeaderComponent,
        CaseListComponent,
        NgIf,
        RouterLinkWithHref
    ]
})
export class UnassignedCasesRoute extends WithDestroy() implements OnInit {

    cases: Case[] = [];
    availableUsers: User[] = [];

    constructor(protected readonly unassignedCasesProvider: UnassignedCasesProvider,
                protected readonly assignCaseProvider: AssignCaseProvider,
                protected readonly usersProvider: UsersProvider,
                protected readonly dialog: MatDialog) {
        super();
    }

    ngOnInit(): void {

        this.fetchUnassignedCases();
        this.usersProvider.getUsers().subscribe({
            next: (value) => this.availableUsers = value,
        })
    }

    openPickUserDialog(cCase: Case) {
        this.dialog.open<PickUserDialogComponent, PickUserDialog>(PickUserDialogComponent, {
            data: {
                users: this.availableUsers,
                title: `Przydziel osobę do sprawy ${cCase.no}`
            }
        }).afterClosed().pipe(
            filter((user) => !!user),
            switchMap((user:User) => this.assignCaseProvider.assignUserToCase(cCase, user)),
        ).subscribe({
            next: () => {
                this.fetchUnassignedCases();
            }
        })
    }

    protected fetchUnassignedCases() {
        this.unassignedCasesProvider.getUnassignedCases().pipe(
            takeUntil(this.componentDestroyed),
        ).subscribe({
            next: (value) => this.cases = value,
            error: () => this.cases = [],
        });
    }
}