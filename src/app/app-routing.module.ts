import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsGridComponent } from './pages/products-grid/products-grid.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'


const rootPath: string = 'accessible-ecommerce-demo';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'plp', component: ProductsGridComponent },
  { path: 'pdp/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
