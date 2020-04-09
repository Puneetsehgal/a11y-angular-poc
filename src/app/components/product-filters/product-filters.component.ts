import { Component, OnInit } from '@angular/core';
import { ProductsGridComponent } from '../../pages/products-grid/products-grid.component'
import { Filters } from '../../classes/filters';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./accordion.scss', './product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
  filters = new Filters();
  totalFilterApplied: number = 0;
  activeFiltersList: Array<any> = [];
  colors: Array<any> = [
    { name: 'blue', selected: false },
    { name: 'green', selected: false },
    { name: 'yellow', selected: false },
    { name: 'red', selected: false },
  ];
  sizes: Array<any> = [
    { name: 'large', selected: false },
    { name: 'medium', selected: false },
    { name: 'small', selected: false },
  ];
  constructor(private products: ProductsGridComponent) { }

  ngOnInit(): void {
  }

  checkboxFilter(event, type: string, value: string) {
    if (event.target.checked) {
      this[type].forEach(item => {
        if (item.name === event.target.value) {
          item.selected = true;
          return;
        }
      });
      this.filters[type].push(value);
    } else {
      const index = this.filters[type].findIndex(x => x == value);
      this.filters[type].splice(index, 1);
      this.setSelectedFalse(type, value);
    }
    this.totalFilterApplied = this.filters.colors.length + this.filters.sizes.length;
    this.products.filterProductsData(this.filters);
  }

  priceRangeFilter(event) {
    this.products.filterProductsData(this.filters);
  }

  clearAllFilter() {
    this.colors.forEach(item => item.selected = false);
    this.sizes.forEach(item => item.selected = false);
    this.totalFilterApplied = 0;
    this.activeFiltersList = [];
    this.filters = new Filters();
    this.products.filterProductsData({});
  }

  clearPriceRangeFilter() {
    this.filters.priceFilterFrom = null;
    this.filters.priceFilterTo = null;
    this.products.filterProductsData(this.filters);
  }

  removeFilter(type, name) {
    this.setSelectedFalse(type, name);
    const index = this.filters[type].findIndex(x => x == name);
    this.filters[type].splice(index, 1);
    this.totalFilterApplied = this.filters.colors.length + this.filters.sizes.length;
    this.products.filterProductsData(this.filters);
  }

  setSelectedFalse(type, name) {
    this[type].forEach(item => {
      if (item.name == name) {
        item.selected = false;
      }
    });
  }

  accordionToggleClick(event) {
    let ariaExpanded: boolean = event.target.getAttribute('aria-expanded') === 'true' ? false : true;
    event.target.setAttribute('aria-expanded', ariaExpanded);
    event.target.parentElement.classList.toggle('collapsed', !ariaExpanded);
  }
}
