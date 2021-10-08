import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
 ],
 exports: [NavBarComponent]
})
export class CoreModule { }
