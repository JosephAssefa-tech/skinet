import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import {SharedModule} from '../shared/shared.module';
import { ShopComponent } from './shop.component';
@NgModule({
  declarations: [ShopComponent, ProductItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ShopComponent]
})
export class ShopModule  {



 }
