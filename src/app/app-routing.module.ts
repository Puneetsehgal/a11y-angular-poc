import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';


const rootPath: string = 'accessible-ecommerce-demo';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'plp', component: ProductsPageComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
