import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl=environment.apiUr;
  private basketSource=new BehaviorSubject<IBasket|null>(null);
  basket$=this.basketSource.asObservable();
  private basketTotalSource=new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$=this.basketTotalSource.asObservable();
  shipping=0;




  constructor(private http:HttpClient) { }

  setShippingPrice(deliveryMethod: IDeliveryMethod)
  {
    this.shipping=deliveryMethod.price;
    this.calculateTotals();

  }


  getBasket(id:string){
    return this.http.get(this.baseUrl + 'Basket?id='+ id)
    .pipe(
      map((basket:any) =>{
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );

  }
  // setBasket(basket:IBasket)
  // {
  //   return this.http.post(this.baseUrl + 'Basket', basket).subscribe((response:IBasket) =>
  //   {
  //     this.basketSource.next(response);
  //     console.log(response);

  //   },
  //   error =>{
  //     console.log(error);
  //   });
  // }
  setBasket(basket:IBasket){

    return this.http.post(this.baseUrl+'Basket',basket)

     .subscribe((response:any) => {

       this.basketSource.next(response);


       this.calculateTotals();

     },error => {

       console.log(error);

     });

  }
  getCurrentBasketValue()
  {
    return this.basketSource.value;
  }
  addItemToBasket(item: IProduct, quantity=1)
  {
    const itemToAdd: IBasketItem=this.mapProductItemToBasketItem(item, quantity);
    let basket= this.getCurrentBasketValue();
    if(basket ===null)
    {
    basket=this.createBasket();

    }


    basket.items=this.addOrUpdateItem(basket.items, itemToAdd, quantity);

    this.setBasket(basket);

  }

  incrementItemQuantity(item:IBasketItem)
  {
    const basket= this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id ===item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item:IBasketItem)
  {
    const basket= this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id ===item.id);
   if(basket.items[foundItemIndex].quantity > 1)
   {
     basket.items[foundItemIndex].quantity--;
     this.setBasket(basket);
   }
   else{
this.removeItemFromBasket(item);
   }

  }
  removeItemFromBasket(item:IBasketItem)
  {
    const basket=this.getCurrentBasketValue();
    if(basket.items.some(x=> x.id === item.id))
    {
      basket.items=basket.items.filter( i =>i.id !==item.id);
      if(basket.items.length > 0)
      {
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }

  }
  deleteLocalBasket(id:string)
  {
this.basketSource.next(null);
this.basketTotalSource.next(null);
localStorage.removeItem('basket_id');
  }

  deleteBasket(basket:IBasket){
    return this.http.delete(this.baseUrl+'Basket?id='+basket.id).subscribe(()=>
    {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },
    error =>{
      console.log(error);

    })
  }


  private calculateTotals()
  {
    const basket=this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal=basket.items.reduce((a,b) =>(b.price * b.quantity)+a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal})

  }

  private addOrUpdateItem(items:IBasketItem[], itemToAdd:IBasketItem,quantity:number):IBasketItem[]
  {
    console.log(items);
    const index=items.findIndex(i=>i.id===itemToAdd.id);
    if(index===-1)
    {
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity +=quantity;
    }
    return items;

  }
  private createBasket(): IBasket{
    const basket=new Basket();
    localStorage.setItem('basket_item',basket.id);
    return basket;


  }
  private mapProductItemToBasketItem(item:IProduct, quantity:number): IBasketItem{
    return{
     id:item.id,
     productName:item.name,
     price:item.price,
     pictureUrl:item.pictureUrl,
     quantity,
     brand:item.productBrand,
     type:item.productType

    }
  }
}
