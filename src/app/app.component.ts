import { Component } from '@angular/core';
import { enableSkipLinks } from './services/utils.service';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a11y-angular-poc';
  constructor(private Modal: ModalComponent) {
    const self = this;
    window.onload = function(){
      enableSkipLinks();
      self.Modal.init('construction-modal');
    } 
  }
}
