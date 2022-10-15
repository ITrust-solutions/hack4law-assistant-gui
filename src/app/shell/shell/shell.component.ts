import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLinkWithHref } from '@angular/router';

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

}
