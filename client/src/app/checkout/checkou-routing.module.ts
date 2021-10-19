import { CheckoutComponent } from './checkout.component';
import { CheckoutSucsessComponent } from './checkout-sucsess/checkout-sucsess.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes =[
  {path:'',component: CheckoutComponent},
  {path:'success',component: CheckoutSucsessComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CheckouRoutingModule { }
