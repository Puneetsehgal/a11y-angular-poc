import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from '../../pages/products-page/products-page.component'
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

  constructor(private productsPage: ProductsPageComponent) { }

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
  updatePagination(index: number, click?: boolean) {
    this.currentPage = index;
    this.nextPage = this.currentPage === this.pageCount ? this.pageCount : this.currentPage + 1;
    this.prevPage = this.currentPage === 1 ? 1 : this.currentPage - 1;
    this.productsPage.productProxyData.currentPageIndex = this.currentPage - 1;
    this.productsPage.productProxyData.productsGrid = this.productsPage.productProxyData.pages[index - 1];

    this.paginationData.map((pages, i) => {
      pages.showPaginationListItem = this.showPaginationList(i + 1);
      return pages
    });
    console.log(click);
    if (click) {
      let element = document.getElementById('page-title');
      element.scrollIntoView({behavior: 'smooth'})
      // focusOnElement(element);
    }
    
  }
}
