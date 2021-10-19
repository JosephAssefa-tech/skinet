import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HomeModule } from './home/home.module';
import { JwtInterceptor } from './core/interceptors/jwtInterceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptors';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShopModule } from './shop/shop.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,

    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
      {provide:HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
      {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
