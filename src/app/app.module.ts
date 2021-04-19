import { VclCalendarModule } from './vcl-calendar/vcl-calendar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VclCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
