import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLinkWithHref } from '@angular/router';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { OpenCaseDialogComponent } from '../open-case-dialog/open-case-dialog.component';
import { CurrentUserService } from '../../user/services/current-user.service';
import { filter, Observable } from 'rxjs';
import { User } from '../../user/model/user';
import { AsyncPipe, NgIf } from '@angular/common';
import { UsersProvider } from '../../user/services/users.provider';
import { PickUserDialogComponent } from '../../user/components/pick-user-dialog/pick-user-dialog.component';
import { PickUserDialog } from '../../user/components/pick-user-dialog/pick-user-dialog';

@Component({
    standalone: true,
    selector: 'loa-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [
        MatSidenavModule,
        MatListModule,
        RouterLinkWithHref,
        AsyncPipe,
        NgIf,
    ]
})
export class ShellComponent {
    db = firebase.firestore();

    currentUser: Observable<User>;
    availableUsers: User[] = [];

    constructor(protected readonly router: Router,
                public readonly currentUserService: CurrentUserService,
                private readonly usersProvider: UsersProvider,
                private readonly dialog: MatDialog) {
        this.listenToQrCodeScanned();
        this.currentUser = currentUserService.getCurrentUserChanges();
        this.setInitialCurrentUser();
    }

    changeUser() {
        this.dialog.open<PickUserDialogComponent, PickUserDialog>(PickUserDialogComponent, {
            data: {
                users: this.availableUsers,
                title: `Zmień użytkownika`
            }
        }).afterClosed().pipe(
            filter((user) => !!user)
        ).subscribe({
            next: (user) => this.currentUserService.setCurrentUser(user)
        })
    }


    private setInitialCurrentUser() {
        this.usersProvider.getUsers().subscribe({
            next: (users) => {
                this.availableUsers = users;
                this.currentUserService.setCurrentUser(users[0]);
            }
        })
    }

    private listenToQrCodeScanned() {
        this.db.collection("case-qr")
            .onSnapshot((doc) => {
                doc.docChanges().forEach(caseScanned => {
                    if (caseScanned.type === "added") {
                        this.dialog.open(OpenCaseDialogComponent, { data: caseScanned.doc.data()['id'] })
                            .afterClosed()
                            .subscribe(() => {
                                this.db.collection("case-qr").doc(caseScanned.doc.id).delete();
                            })
                    }
                })
            });
    }
}
