import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shell/header/header.component';

@Component({
    standalone: true,
    selector: 'loa-case-route',
    templateUrl: 'case.route.html',
    styleUrls: ['./case.route.scss'],
    imports: [
        HeaderComponent
    ]
})
export class CaseRoute {

}