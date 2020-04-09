import { Injectable } from '@angular/core';
import { HostListener } from '@angular/core';
import { activeElementMatches } from './utils.service';
import { observe } from 'rxjs-observe'

@Injectable({
  providedIn: 'root'
})

export class MiniCartService {
  instances = {
    miniCartExpanded: false
  }
  miniCart = observe(this.instances);
  outsideMiniCart = true;


  constructor() { }

  closeMiniCart() {
    this.miniCart.proxy.miniCartExpanded = false;
    this.outsideMiniCart = false;
  }

  openMiniCart() {
    this.miniCart.proxy.miniCartExpanded = true;
    this.outsideMiniCart = true;
  }

  toggleMiniCart(event) {
    event.stopPropagation();
    if (this.miniCart.proxy.miniCartExpanded) {
      this.closeMiniCart();
    } else {
      this.openMiniCart();
    }
  }

  @HostListener('document:click')
  clickOut() {
    if (this.outsideMiniCart) {
      this.closeMiniCart();
    }
  }

  blurCloseMiniCart() {
    activeElementMatches('.mini-cart__dropdown *').then((focusInDropdown) => {
      if (!focusInDropdown) {
        this.closeMiniCart();
      }
    });
  }
}
