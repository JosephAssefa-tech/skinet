import { IOrderItem, IOrderToCreate } from '../shared/models/order';

import { HttpClient } from '@angular/common/http';
import {IDeliveryMethod} from '../shared/models/deliveryMethod';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl=environment.apiUr;


  constructor(private http:HttpClient) { }

  creatOrder(order:IOrderToCreate)
  {
    return this.http.post(this.baseUrl+'orders',order);

  }

  getDeliveryMethods()
  {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm:any) =>
      {
        return dm.sort((a:any,b:any) =>b.price - a.price);

      })
    );
  }
}
