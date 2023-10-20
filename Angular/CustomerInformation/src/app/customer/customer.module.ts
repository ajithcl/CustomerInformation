import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class CustomerModule { }
