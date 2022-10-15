import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shell/header/header.component';
import { MyCasesListComponent } from './my-cases-list/my-cases-list.component';

import { ActivatedRoute, Router } from '@angular/router';
import { Case } from '../../model/case';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';

@Component({
    standalone: true,
    templateUrl: './my-cases.route.html',
    imports: [
        HeaderComponent,
        MyCasesListComponent,
        MyCalendarComponent
    ],
    styleUrls: ['./my-cases.route.scss']
})
export class MyCasesRoute {

    constructor(protected readonly router: Router,
                protected readonly activatedRoute: ActivatedRoute) {
    }

    redirectToCase(routedCase: Case): void {
        this.router.navigate([routedCase.id], { relativeTo: this.activatedRoute })
    }
}
