import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'loa-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    imports: [
        MatIconModule,
        NgIf,
        MatButtonModule,
    ]
})
export class TileComponent {

    @Input() icon = '';
}