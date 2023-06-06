import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
        provide: 'URL_GOS',
        useValue: environment.baseUrlGOS
    },
    {
        provide: 'URL_AVU',
        useValue: environment.baseUrlAVU
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
