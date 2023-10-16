import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class CustomerModule { }
