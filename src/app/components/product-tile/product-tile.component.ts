import { Component, OnInit, Input } from '@angular/core';
import { ProductsGridComponent } from '../../pages/products-grid/products-grid.component'
import { ConstantVariablesService } from '../../services/constant-variables.service'

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() productData;
  rootPath: string;
  constructor(private productsPage: ProductsGridComponent, private _constant: ConstantVariablesService) {
    this.rootPath = this._constant.rootPath;
  }
  ngOnInit() {
    this.productsPage.breadcrumbs.proxy.breadcrumbData = [{ label: 'Home', link: this.rootPath }, { label: 'Women', link: `${this.rootPath}/plp` }, { label: 'Women’s Tops', link: `${this.rootPath}/plp` }];
    document.querySelectorAll('.primary-nav__heading')[0].classList.add('active');
  }
}
