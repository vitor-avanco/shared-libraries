import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VclSelectComponent } from './vcl-select.component';



@NgModule({
  declarations: [
    VclSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VclSelectComponent
  ]
})
export class VclSelectModule { }
