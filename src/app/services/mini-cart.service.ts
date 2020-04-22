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
  
  cartItems: Array<any> = [{
    cart_id: 1,
    color: "red",
    price_sale: "34.99",
    product_id: "37",
    product_name: "Long Sleeved T-Shirt",
    quantity: "1",
    size: "small",
    thumbnail_url: "blue-t-shirt_4460x4460.jpg",
    total_price: 34.99
  }, {
    cart_id: 1,
    color: "red",
    price_sale: "34.99",
    product_id: "37",
    product_name: "Long Sleeved T-Shirt",
    quantity: "1",
    size: "small",
    thumbnail_url: "blue-t-shirt_4460x4460.jpg",
    total_price: 34.99
  }];

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
