import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customerList:Customer[] = [];

  constructor(private customerService: CustomerService){}

  ngOnInit():void{
    this.customerService.getCustomers().subscribe({
      next:(data)=>{
        console.log("Success");
        // response, CustomersJsonText are the keys in the JSON file.
        let response = data.response;
        let customersJsonText = response.CustomersJsonText;
        this.customerList = JSON.parse(customersJsonText);
        console.log('success');
      },error:(err)=>{
        console.error("Error occured:");
        console.log(err);
      }
    });

  }


}
