import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';

import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { NgModule } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;


 products !: IProduct[];
 brands !: IBrand[];
 types !: IType[];
totalCount:number;
shopParams = new ShopParams();


 sortOptions=[
   {name:'Alphabetical', value:'name'},
   {name:'Price: Low to High', value:'priceAsc'},
   {name:'Price: High to Low', value:'priceDesc'}

 ]


  constructor(private shopeService: ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  getProducts()
  {
    this.shopeService.getProducts(this.shopParams).subscribe(response =>{
        this.products=response.data;
        this.shopParams.pageNumber=response.pageIndex;
        this.shopParams.pageSize=response.pageSize;
        this.totalCount=response.count;
      }
      ,
      error =>
      {
        console.log(error);
      } );
  }

  getBrands()
  {
    this.shopeService.getBrands().subscribe(response =>
      {
        this.brands=[{id:0, name:'All'}, ...response];
      }
      ,
      error =>
      {
        console.log(error);
      } );
  }
  getTypes()
  {
    this.shopeService.getTypes().subscribe(response =>
      {
        this.types=[{id:0, name:'All'}, ...response];
      }
      ,
      error =>
      {
        console.log(error);
      } );
  }

  onBrandSelected(brandId:number)
  {
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeSelected(typeId:number)
  {

    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getTypes();
    this.getProducts();
  }
  onSortSelected(sort:string)
  {
    this.shopParams.sort=sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber !=event)
    {
      this.shopParams.pageNumber=event;
      this.getProducts();
    }



  }

  onSearch()
  {
    this.shopParams.search=this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();

  }
  OnReset(){
this.searchTerm.nativeElement.value='';
this.shopParams= new ShopParams();
this.getProducts();
  }
}
