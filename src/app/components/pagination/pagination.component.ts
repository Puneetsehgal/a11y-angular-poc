import { Component, OnInit } from '@angular/core';
import { ProductsGridComponent } from '../../pages/products-grid/products-grid.component'
import { focusOnElement } from '../../services/utils.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  paginationData;
  prevPage: number;
  nextPage: number;
  currentPage: number = 1;
  pageCount: number = 0;

  constructor(private productsPage: ProductsGridComponent) { }

  ngOnInit(): void {
    const self = this;
    this.productsPage.productsObservable.pages.subscribe(data => {
      self.paginationData = data;
      self.pageCount = data.length;
      self.updatePagination(1)
    });
  }

  /*
  * function will filter the pagination list iteme that need to show on the page
  *
  * @function showPaginationList
  * @param {number} - index
  *
  * @returns {Boolean}
  */
  showPaginationList(index: number) {
    const maxNumOfPagesToShow = this.pageCount > 5;
    const showTailEllipsis = maxNumOfPagesToShow && (this.currentPage < 5);
    const showHeadEllipsis = maxNumOfPagesToShow && this.currentPage > (this.pageCount - 4);
    return ((showTailEllipsis && (index < 6))
      || (showHeadEllipsis && (index > (this.pageCount - 6)))
      || (this.pageCount < 6)
      || (!(showTailEllipsis) && !(showHeadEllipsis) && (this.currentPage - (index + 1) >= -3 && this.currentPage - (index + 1) <= 1)));
  }

  /*
  * function will update pagination logics
  *
  * @function updatePaginatio
  * @param {number} - index
  *
  * @returns {Boolean}
  */
  updatePagination(index: number, event?) {
    this.currentPage = index;

    this.nextPage = (index === this.pageCount && this.pageCount) || index + 1;
    this.prevPage = (index === 1 && index) || index - 1;

    this.productsPage.productProxyData.currentPageIndex = index - 1;
    this.productsPage.productProxyData.productsGrid = this.productsPage.productProxyData.pages[index - 1];

    this.paginationData.map((pages, i) => {
      i++;
      pages.showPaginationListItem = this.showPaginationList(i);
      pages.label = i;
      return pages
    });

    // move focus back to the top
    if (event) {
      let element = document.getElementById('content');
      event.currentTarget.blur();
      element.scrollIntoView({behavior: 'smooth'});      
    }
  }
}
