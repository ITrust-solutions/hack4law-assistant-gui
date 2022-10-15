import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLinkWithHref } from '@angular/router';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { OpenCaseDialogComponent } from '../open-case-dialog/open-case-dialog.component';

@Component({
    standalone: true,
    selector: 'loa-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [
        MatSidenavModule,
        MatListModule,
        RouterLinkWithHref,
    ]
})
export class ShellComponent {
    db = firebase.firestore();

    constructor(protected readonly router: Router,
                private readonly dialog: MatDialog) {
        this.listenToQrCodeScanned();
    }

    private listenToQrCodeScanned() {
        this.db.collection("case-qr")
            .onSnapshot((doc) => {
                doc.docChanges().forEach(caseScanned => {
                    if (caseScanned.type === "added") {
                        this.dialog.open(OpenCaseDialogComponent, { data: caseScanned.doc.id })
                            .afterClosed()
                            .subscribe(() => {
                                this.db.collection("case-qr").doc(caseScanned.doc.id).delete();
                            })
                    }
                })
            });
    }
}
