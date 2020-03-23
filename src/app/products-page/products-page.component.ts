import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from '../product';
import { ProductsDataService } from '../products-data.service';
import { filter, map, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnDestroy {
  productsData: Product;
  
  constructor(private render: Renderer2, private productDataService: ProductsDataService) { 
    this.render.addClass(document.body, 'page-plp');
  }

  ngOnInit() {
    const self = this;
    this.productDataService.getProductsData().then(function(data) {
      self.productsData = data;
    });

    
  }

  filterProductsData(filters) {
      const self = this;
      const detail = {...this.getColorFilter(filters), ...this.getSizeFilter(filters), ...this.getPriceRangeFilter(filters)};
      this.productDataService.updateFilters(detail).then(function(data) {
          self.productsData = data;
      });
  }

  getPriceRangeFilter(filters) {
    const priceRangeFilter = (filters.priceFilterFrom && filters.priceFilterTo && filters.priceFilterFrom >= 0 && filters.priceFilterTo >= 0)
        ? { $gte: Number(filters.priceFilterFrom), $lte: Number(filters.priceFilterTo) }
        : { $gt: null };
    return {
      price_sale: priceRangeFilter
    };
  };

  sortProducts(sortOptions) {
    const self = this;
    this.productDataService.sortOrderData(sortOptions).then(function(data) {
      self.productsData = data;
    });;
  }

  getColorFilter(filters) {
    return  filters.colors && filters.colors.length > 0 && {color: {$elemMatch: {$in: filters.colors}}};
  }

  getSizeFilter(filters) {
    return  filters.sizes && filters.sizes.length > 0 && {size: {$elemMatch: {$in: filters.sizes}}};
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'page-plp');
  }
}
