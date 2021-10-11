export interface IBasket
{
  id:string;
  items:IBasketItem[];
}
export interface IBasketItem
{
  id:number;
  productName:string;
  price:number;
  quantity:number;
  pictureUrl:string;
  brand:string;
  type:string;
}


export class Basket implements IBasket{
  id='guid';
  items:IBasketItem[];

}
