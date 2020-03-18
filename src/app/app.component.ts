import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a11y-angular-poc';
  globalVariables = {
    rootPath: (
      window.location.pathname === '/index.html'
      || window.location.pathname === '/accessible-ecommerce-demo/'
      || window.location.pathname === '/accessible-ecommerce-demo/index.html'
    ) ? '.' : '..'
  };
}
