import { BasketComponent } from './basket.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: BasketComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)  ],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
