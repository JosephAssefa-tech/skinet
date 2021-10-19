import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [PagingHeaderComponent,PagerComponent, OrderTotalsComponent, TextInputComponent, StepperComponent, BasketSummaryComponent],
  imports: [
   CommonModule,
   PaginationModule.forRoot(),
   CarouselModule.forRoot(),
   BsDropdownModule.forRoot(),
   ReactiveFormsModule,
   CdkStepperModule,
   RouterModule
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
