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
    let customerResult = this.customerService.getCustomers();
    //TODO : Needs to get observable type from customer service
    console.log('From customer.component');
    console.log(customerResult);
  }


}
