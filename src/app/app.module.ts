import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { CheckoutHeaderComponent } from './components/checkout-header/checkout-header.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductsGridComponent } from './pages/products-grid/products-grid.component';
import { ProductSortComponent } from './components/product-sort/product-sort.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalComponent  } from './components/modal/modal.component';
import { MiniCartComponent, MiniCartItems } from './components/mini-cart/mini-cart.component';

import { ConstantVariablesService } from './services/constant-variables.service';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CheckoutFormComponent, FieldErrorDisplayComponent, TooltipComponent } from './components/checkout-form/checkout-form.component';
import { FormFieldsService } from './services/form-fields.service';

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
    ProductsGridComponent,
    ProductSortComponent,
    BreadcrumbComponent,
    PaginationComponent,
    ModalComponent,
    MiniCartComponent, 
    MiniCartItems, 
    ProductDetailComponent, 
    PageNotFoundComponent, 
    CheckoutFormComponent,
    FieldErrorDisplayComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConstantVariablesService,
    ProductTileComponent,
    BreadcrumbComponent,
    ModalComponent,
    FormFieldsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
