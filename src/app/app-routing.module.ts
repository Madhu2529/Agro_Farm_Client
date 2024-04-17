import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './customer-landing-page/registration/registration.component';
import { CustomerLandingPageComponent } from './customer-landing-page/customer-landing-page.component';
import { AuthorisationErrorComponent } from './authorisation-error/authorisation-error.component';
import { LoginComponent } from './customer-landing-page/login/login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerDetailsComponent } from './customer-home/customer-details/customer-details.component';
import { ViewAllProductsComponent } from './customer-home/view-all-products/view-all-products.component';
import { CustomerCartComponent } from './customer-home/customer-cart/customer-cart.component';
import { PlaceOrderComponent } from './customer-home/place-order/place-order.component';
import { ViewOrderComponent } from './customer-home/view-order/view-order.component';
import { CardComponent } from './customer-home/card/card.component';

const routes: Routes = [
  { path: 'error', component: AuthorisationErrorComponent },
  { path: '', redirectTo: '/applicationHome/login', pathMatch: 'full' },
  {
    path: 'applicationHome', component: CustomerLandingPageComponent, children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegistrationComponent }
      ]
  },
  { path: 'home', component: CustomerHomeComponent, children: [
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: 'details', component: CustomerDetailsComponent},
    { path: 'products', component: ViewAllProductsComponent},
    { path: 'cart', component: CustomerCartComponent},
    { path: 'placeOrder', component: PlaceOrderComponent},
    { path: 'viewOrder', component: ViewOrderComponent},
    { path: 'card', component: CardComponent}
  ]
  },
  { path: '', redirectTo: '/applicationHome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
