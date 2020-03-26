import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { CheckoutHeaderComponent } from './components/checkout-header/checkout-header.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductSortComponent } from './components/product-sort/product-sort.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalComponent  } from './components/modal/modal.component';

import { ConstantVariablesService } from './services/constant-variables.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GlobalHeaderComponent,
    CheckoutHeaderComponent,
    CheckoutComponent,
    HomepageComponent,
    ProductTileComponent,
    ProductFiltersComponent,
    ProductsPageComponent,
    ProductSortComponent,
    BreadcrumbComponent,
    PaginationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ConstantVariablesService,
    ProductTileComponent,
    BreadcrumbComponent,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
