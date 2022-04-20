import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyComponent } from './buy/buy.component';
import { CallbackurlComponent } from './callbackurl/callbackurl.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    CallbackurlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
