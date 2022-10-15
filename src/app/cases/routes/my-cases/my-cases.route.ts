import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shell/header/header.component';

@Component({
    standalone: true,
    templateUrl: './my-cases.route.html',
    imports: [
        HeaderComponent
    ],
    styleUrls: ['./my-cases.route.scss']
})
export class MyCasesRoute {

}
