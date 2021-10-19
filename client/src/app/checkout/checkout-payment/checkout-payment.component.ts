import { Basket, IBasket } from 'src/app/shared/models/basket';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
@Input() checkoutForm:FormGroup;
  constructor(private router:Router,private basketService: BasketService,private checkoutService: CheckoutService,private toastr:ToastrService) { }

  ngOnInit() {
  }
  submitOrder()
  {

const basket=this.basketService.getCurrentBasketValue();
const orderToCreate=this.getOrderToCreate(basket);
this.checkoutService.creatOrder(orderToCreate).subscribe((order:any)=>
{
  this.toastr.success('Order Created Sucessfully');
  this.basketService.deleteLocalBasket(basket.id);
  const navigationExtras:NavigationExtras={state:order};
  this.router.navigate(['checkout/success'], navigationExtras);
},
error =>{
  this.toastr.error(error.message);
  console.log(error);
})
  }


  private getOrderToCreate(basket:IBasket)
  {

 return {
   basketId:basket.id,
   deliveryMethodId:+this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
   shipToAddress:this.checkoutForm.get('addressForm').value

  };
}

}
