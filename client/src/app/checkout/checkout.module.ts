import { CheckouRoutingModule } from './checkou-routing.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutComponent } from './checkout.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSucsessComponent } from './checkout-sucsess/checkout-sucsess.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSucsessComponent,


  ],
  imports: [
    CommonModule,
    CheckouRoutingModule,
    SharedModule,


  ]
})
export class CheckoutModule { }
