import { Component } from '@angular/core';
import { HeaderComponent } from '../shell/header/header.component';

@Component({
    standalone: true,
    selector: 'loa-archives-route',
    templateUrl: './archives.route.html',
    imports: [
        HeaderComponent
    ],
    styleUrls: ['./archives.route.scss']
})
export class ArchivesRoute {

}