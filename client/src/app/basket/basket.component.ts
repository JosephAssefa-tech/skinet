import { Component, OnInit } from '@angular/core';
import {IBasket, IBasketItem} from '../shared/models/basket';

import {BasketService} from './basket.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$:Observable<IBasket>;

  constructor(private basketService:BasketService) { }

  ngOnInit() {
    this.basket$=this.basketService.basket$;
  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  incrementItemQuantity(item:IBasketItem)
  {
    this.basketService.incrementItemQuantity(item);
  }
  decrementItemQuanitity(item:IBasketItem)
  {
    this.basketService.decrementItemQuantity(item);
  }

}
