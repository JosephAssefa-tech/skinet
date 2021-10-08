import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpParams } from '@angular/common/http';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl='https://localhost:44397/api/';

  constructor(private http: HttpClient) {


   }

   getProducts(shopParams:ShopParams)
   {

    let params= new HttpParams();
if(shopParams.brandId !==0)
{
  params=params.append('brandId',shopParams.brandId.toString());
}
if(shopParams.typeId !==0)
{
  params=params.append('typeId',shopParams.typeId.toString());
}

  if(shopParams.search)
  {
    params=params.append('search',shopParams.search);
  }


  params=params.append('sort',shopParams.sort);
  params=params.append('pageIndex',shopParams.pageNumber.toString());
  params=params.append('pageIndex',shopParams.pageSize.toString());



     return this.http.get<IPagination>(this.baseUrl + 'productsControllers' ,{observe:'response', params})
     .pipe(
       map(response =>{

          return response.body;
        })
     );

   }

   getBrands()
   {
     return this.http.get<IBrand[]>(this.baseUrl + 'productsControllers/brands');
   }

   getTypes()
   {
     return this.http.get<IType[]>(this.baseUrl + 'ProductsControllers/types');
   }


}
