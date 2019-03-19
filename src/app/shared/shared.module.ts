import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [ CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule
    // Directives and other shared elements that can be added only once
  ]
})
export class SharedModule { }
