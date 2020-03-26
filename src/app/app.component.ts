import { Component } from '@angular/core';
import { enableSkipLinks } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a11y-angular-poc';
  constructor() {
    window.onload = enableSkipLinks;
  }
}
