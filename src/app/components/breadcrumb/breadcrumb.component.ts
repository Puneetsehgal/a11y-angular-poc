import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from '../../pages/products-page/products-page.component'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;

  constructor(private productsPage: ProductsPageComponent) { }

  ngOnInit(): void {
    this.productsPage.breadcrumbs.observables.breadcrumbData.subscribe(data => {
      this.breadcrumbs = data;
    })
  }
}
