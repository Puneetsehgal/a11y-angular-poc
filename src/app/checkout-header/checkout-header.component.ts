import { Component, OnInit } from '@angular/core';
import { ConstantVariablesService } from '../constant-variables.service'

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss']
})
export class CheckoutHeaderComponent implements OnInit {
  rootPath: string;
  constructor(private _constant: ConstantVariablesService) { 
    this.rootPath = this._constant.rootPath;
  }

  ngOnInit(): void {
  }

}
