import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() products: Product;
  constructor() { }

  ngOnInit() {
  }
}
