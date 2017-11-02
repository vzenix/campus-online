import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routing/routing.module';
import { VZenixCoreModule } from './vzenix_core/vzenix.core.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    VZenixCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
