import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [
    CommonModule
    // Directives and other shared elements that can be added only once
  ]
})
export class SharedModule { }
