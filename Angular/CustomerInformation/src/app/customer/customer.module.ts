import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class CustomerModule { }
