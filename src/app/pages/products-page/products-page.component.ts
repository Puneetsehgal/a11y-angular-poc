import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductsDataService } from '../../services/products-data.service';
import { chunk } from '../../services/utils.service';
import { observe } from "rxjs-observe";
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnDestroy {
  productPerPage: number = 12;
  totalProductsData: Product = new Product();
  totalProductLength: number = 0;
  loading: boolean = true;
  instance = {
    pages: [],
    productsGrid: [],
    currentPageIndex: 1
  };
  products = observe(this.instance);
  productsObservable = this.products.observables;
  productProxyData = this.products.proxy;

  breadcrumbInstance = {
    breadcrumbData: []
  }
  breadcrumbs = observe(this.breadcrumbInstance);

  constructor(private render: Renderer2, 
    private productDataService: ProductsDataService, 
    private Modal: ModalComponent ) {
    this.render.addClass(document.body, 'page-plp');
  }

  ngOnInit() {
    const self = this;
    this.productDataService.getProductsData().then(function (data) {
      self.updateProductsData(self, data);
      self.Modal.init('construction-modal');
    });
  }

  updateProductsData(self, data) {
    self.loading = false;
    self.totalProductsData = data;
    self.totalProductLength = Product.totalProductsLength(data);
    self.productProxyData.pages = chunk(data, this.productPerPage);
    self.productProxyData.productsGrid = self.productProxyData.pages[0];
  }

  filterProductsData(filters) {
    const self = this;
    const detail = { ...this.getColorFilter(filters), ...this.getSizeFilter(filters), ...this.getPriceRangeFilter(filters) };
    this.productDataService.updateFilters(detail).then(function (data) {
      self.updateProductsData(self, data);
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

  getColorFilter(filters) {
    return filters.colors && filters.colors.length > 0 && { color: { $elemMatch: { $in: filters.colors } } };
  }

  getSizeFilter(filters) {
    return filters.sizes && filters.sizes.length > 0 && { size: { $elemMatch: { $in: filters.sizes } } };
  }

  sortProducts(sortOptions) {
    const self = this;
    this.productDataService.sortOrderData(sortOptions).then(function (data) {
      self.updateProductsData(self, data);
    });
  }

  setProductsPerPage(value: number) {
    this.productPerPage = value;
    this.productProxyData.pages = chunk(this.totalProductsData, this.productPerPage);
    this.productProxyData.productsGrid = this.productProxyData.pages[0];
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'page-plp');
  }

}
