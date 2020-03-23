import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from '../app/checkout/checkout.component';
import { HomepageComponent } from '../app/homepage/homepage.component';
import { ProductsPageComponent } from '../app/products-page/products-page.component';


const rootPath: string = 'accessible-ecommerce-demo';
const routes: Routes = [
  { path: '', redirectTo: rootPath, pathMatch: 'full' },
  { path: rootPath, component: HomepageComponent },
  { path: `${rootPath}/plp`, component: ProductsPageComponent },
  { path: "checkout", component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
