import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PouchDBService } from "./pouch-db.service"

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  defaultQuery = {
    selector: {
      category: { $eq: 'Women' }, // These values can be pulled from URL vars for unique PLPs for every subcat
      subcategory: { $eq: 'Women’s Tops' },
      price_sale: { $gt: null },
      rating: { $gt: null }
    },
    sort: [{ rating: 'desc' }]
  };

  currentQuery = { ...this.defaultQuery };


  constructor(private http: HttpClient, private productDB: PouchDBService) { }

  getProductsData() {
    const self = this;
    return self.productDB.getOrCreateProductDB().then(() => self.fetchComponentData(self));
  };

  fetchComponentData(self, filters?) {
    if (filters) {
      self.currentQuery.selector = { ...self.defaultQuery.selector, ...filters };
    } else {
      self.currentQuery.selector = {  ...self.defaultQuery.selector };
    }
    return self.productDB.query(['rating'], self.currentQuery).then(result => self.updateAllProducts(result));
  }

  sortOrderData(sortOption) {
    let self = this;
    self.currentQuery.sort = [sortOption];
    const fields = Object.keys(sortOption);
    return self.productDB.query(fields, self.currentQuery).then(result => self.updateAllProducts(result));
  }

  updateFilters(filters?: {}) {
    const self = this;
    return self.fetchComponentData(self, filters)
  }

  updateAllProducts(result) {
    return result.docs;
  }
}
