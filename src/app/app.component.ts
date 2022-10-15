import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'loa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'law-office-assistant';

  constructor(iconRegistry: MatIconRegistry,
              domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('qr-code', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/qr.svg'));
  }
}
