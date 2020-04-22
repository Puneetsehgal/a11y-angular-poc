import { Component, OnInit } from '@angular/core';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component'

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private cf: CheckoutFormComponent) { }

  ngOnInit(): void {
  }

  finishOrder() {
    this.cf.ngOnInit();
    this.cf.onSubmit();
  }

}
