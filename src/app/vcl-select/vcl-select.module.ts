import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VclSelectComponent } from './vcl-select.component';



@NgModule({
  declarations: [
    VclSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VclSelectComponent
  ]
})
export class VclSelectModule { }
