import { CheckouRoutingModule } from './checkou-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckouRoutingModule

  ]
})
export class CheckoutModule { }
