import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { CheckoutHeaderComponent } from './checkout-header/checkout-header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConstantVariablesService } from './constant-variables.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GlobalHeaderComponent,
    CheckoutHeaderComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ConstantVariablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
