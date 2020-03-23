import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { CheckoutHeaderComponent } from './checkout-header/checkout-header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConstantVariablesService } from './constant-variables.service';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductSortComponent } from './product-sort/product-sort.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';

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
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ConstantVariablesService, ProductTileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
