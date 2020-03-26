import { Component } from '@angular/core';
import { trapTabKey, $$, setFocusToFirstItem } from '../../services/utils.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  element;
  main;
  focusedElementBeforeModal;
  shown: boolean = false;

  constructor() {}

  onKeyDown(event) {
    if (this.shown && event.which === 27) {
      event.preventDefault();
      this.hide();
    }

    if (this.shown && event.which === 9) {
      trapTabKey(this.element, event);
    }
  }

  onFocus() {
    if (this.shown && !this.element.contains(event.target)) {
      setFocusToFirstItem(this.element);
    }
  }

  show(event) {
    event.preventDefault();
    this.shown = true;
    this.element.setAttribute('aria-hidden', 'false');
    this.element.setAttribute('aria-expanded', 'true');
    this.main.setAttribute('aria-hidden', 'true');
    document.body.classList.add('modal-open');
    this.focusedElementBeforeModal = document.activeElement;
    setFocusToFirstItem(this.element);
  }

  hide() {
    let miniCartDropDown = document.querySelector(".mini-cart__dropdown");
    this.shown = false;
    this.element.setAttribute('aria-hidden', 'true');
    this.element.setAttribute('aria-expanded', 'false');
    this.main.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('modal-open');
    if (miniCartDropDown && miniCartDropDown.contains(this.focusedElementBeforeModal)) {
      document.querySelector(".secondary-nav__mini-cart button")[0].focus();
    } else {
      this.focusedElementBeforeModal.focus();
    }
  }

  initEvents(element, mainSelector) {
    this.element = element;
    this.main = document.querySelector(mainSelector) || document.body;
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.body.addEventListener('focus', this.onFocus.bind(this), true);
    $$('[data-modal-show="' + this.element.id + '"]').forEach(opener => opener.addEventListener('click', this.show.bind(this)));
    $$('[data-modal-hide]', this.element).concat($$('[data-modal-hide="' + this.element.id + '"]')).forEach(closer => closer.addEventListener('click', this.hide.bind(this)));
  }

  init (modalElementId) {
    let modalElement = document.querySelector('#' + modalElementId);
    this.initEvents(modalElement, '#content');
  }
}
