import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {
  customerList:Customer[] = [];
  
  // Get the Customer property names 
  customerColumns = this.GetClassPropertyNames(new Customer());

  constructor(private customerService: CustomerService,
              private _snackbar: MatSnackBar){ }
  
  // Generic method for accessing the property names of a class object.
  GetClassPropertyNames(target: any) {
    let result:string[]=[];
    Reflect.ownKeys(target)
    .map(key =>{
      result.push(key.toString())
    })
    return result;
  }

  // Generic method for showing the Snackbar
  OpenSnackbar(message_content:string):void{
    this._snackbar.open(message_content,
      "",
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    )
  }

  ngOnInit():void{
    this.customerService.getCustomers().subscribe({
      next:(data)=>{
        // response, CustomersJsonText are the keys in the JSON file.
        let response = data.response;
        let customersJsonText = response.CustomersJsonText;
        this.customerList = JSON.parse(customersJsonText);
      },error:(err)=>{
        //console.log(err);
        this.OpenSnackbar("Error while accessing Customer list.");
      }
    });
  }


}
