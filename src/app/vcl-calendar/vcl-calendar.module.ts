import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VclCalendarComponent } from './vcl-calendar.component';
import { FormsModule } from '@angular/forms';
import { VclCalendarDirective } from './vcl-calendar.directive';



@NgModule({
  declarations: [
    VclCalendarComponent,
    VclCalendarDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VclCalendarDirective
  ]
})
export class VclCalendarModule { }
