import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from '../products-page/products-page.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {

  constructor(private products: ProductsPageComponent) { }
  ngOnInit(): void {
  }

  sortOrder(event) {
    if (!event.target.value) return { newest: 'desc' };
    const [sortBy, sortDirection] = event.target.value.split(':');
    let sortOptions = {};
    sortOptions[sortBy] = sortDirection;
    this.products.sortProducts(sortOptions);
  }

  productPerPage(value){
      console.log(value);
  }
}
