import { Component, OnInit } from '@angular/core';
import {  MiniCartService } from '../../services/mini-cart.service';


@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  miniCartExpanded: boolean;

  constructor( public miniCartService: MiniCartService ) {
    this.miniCartService.miniCart.observables.miniCartExpanded.subscribe(data => {
      this.miniCartExpanded = data;
    });
  }

  ngOnInit(): void {}

}

@Component({
  selector: 'app-mini-cart-items',
  templateUrl: './mini-cart-items.component.html',
  styleUrls: ['./mini-cart.component.scss']
})

export class MiniCartItems implements OnInit {
  cartItems: Array<any>

  constructor(private miniCartService: MiniCartService) {}

  ngOnInit() {
    this.cartItems = this.miniCartService.cartItems;
  }
}
