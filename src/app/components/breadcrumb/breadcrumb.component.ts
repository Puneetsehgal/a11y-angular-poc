import { Component, OnInit } from '@angular/core';
import { ProductsGridComponent } from '../../pages/products-grid/products-grid.component'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;

  constructor(private productsPage: ProductsGridComponent) { }

  ngOnInit(): void {
    this.productsPage.breadcrumbs.observables.breadcrumbData.subscribe(data => {
      this.breadcrumbs = data;
    })
  }
}
