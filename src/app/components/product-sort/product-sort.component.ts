import { Component, OnInit } from '@angular/core';
import { ProductsGridComponent } from '../../pages/products-grid/products-grid.component'

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {
  currentProductArrayLength: number = 0;
  showingProducts: string;
  itemsPerPage: number = 12;

  constructor(private productsPage: ProductsGridComponent) { }

  ngOnInit(): void {
    this.productsPage.productsObservable.currentPageIndex.subscribe(index => {

      if (this.productsPage.totalProductLength > 0) {
        let start = index * this.itemsPerPage + 1;
        let end = (this.itemsPerPage > 0) ? Math.min((index + 1) * this.itemsPerPage, this.productsPage.totalProductLength) : this.productsPage.totalProductLength;
        this.showingProducts = `${start} to ${end} of ${this.productsPage.totalProductLength}`;
      } else {
        this.showingProducts = '0 products';
      }

      if (this.productsPage.totalProductLength <= 12) {
        document.getElementById('itemsPerPage')[2].selected = true;
        document.getElementById('itemsPerPage').setAttribute('disabled', 'disabled');
      } else {
        if (document.getElementById('itemsPerPage').hasAttribute('disabled')) {
          document.getElementById('itemsPerPage')[0].selected = true;
          document.getElementById('itemsPerPage').removeAttribute('disabled');
        }
      }
    });
  }

  sortOrder(event) {
    if (!event.target.value) return { newest: 'desc' };
    const [sortBy, sortDirection] = event.target.value.split(':');
    let sortOptions = {};
    sortOptions[sortBy] = sortDirection;
    this.productsPage.sortProducts(sortOptions);
  }

  productsPerPage(value) {
    this.itemsPerPage = value;
    this.productsPage.setProductsPerPage(+value); // + prefix covert string to number
  }

  viewBy(value) {
    if (value == 'list_view') {
      document.querySelector(".product-grid__product-tiles").classList.add('list_view');
    } else {
      document.querySelector(".product-grid__product-tiles").classList.remove('list_view');
    }
  }
}
