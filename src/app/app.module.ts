import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLandingPageComponent } from './customer-landing-page/customer-landing-page.component';
import { LoginComponent } from './customer-landing-page/login/login.component';
import { RegistrationComponent } from './customer-landing-page/registration/registration.component';
import { AuthorisationErrorComponent } from './authorisation-error/authorisation-error.component';
import { LoginService } from './customer-landing-page/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

import { CustomerCartComponent } from './customer-home/customer-cart/customer-cart.component';
import { CustomerDetailsComponent } from './customer-home/customer-details/customer-details.component';
import { PlaceOrderComponent } from './customer-home/place-order/place-order.component';
import { ProductDetailsComponent } from './customer-home/product-details/product-details.component';
import { ViewAllProductsComponent } from './customer-home/view-all-products/view-all-products.component';
import { ViewOrderComponent } from './customer-home/view-order/view-order.component';
import { CardComponent } from './customer-home/card/card.component';

import { EkartRoutingGuard } from './app.routing-guard';
import { RegistrationService } from './customer-landing-page/registration/registration.service';
import { CustomerHomeService } from './customer-home/customer-home.service';
import { ViewAllProductService } from './customer-home/view-all-products/view-all-product.service';
import { PlaceOrderService } from './customer-home/place-order/place-order.service';
import { ProductDescriptionPipe } from './pipes/product-description.pipe';
import { CardService } from './customer-home/card/card.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthorisationErrorComponent,
    CustomerHomeComponent,
    CustomerLandingPageComponent,
    LoginComponent,
    RegistrationComponent,
    CustomerCartComponent,
    CustomerDetailsComponent,
    PlaceOrderComponent,
    ProductDetailsComponent,
    ViewAllProductsComponent,
    ViewOrderComponent,
    ProductDescriptionPipe,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    NgbCarouselModule,
    NgxPaginationModule
  ],
  providers: [EkartRoutingGuard, 
    LoginService, 
    CardService,
    RegistrationService, 
    CustomerHomeService,
    ViewAllProductService,
    PlaceOrderService
    ],
  exports: [
      ProductDetailsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],   

  bootstrap: [AppComponent]
})
export class AppModule { }
