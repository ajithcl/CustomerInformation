import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customer = new Customer();


  constructor(
    private _activatedRoute:ActivatedRoute,
    private _customerService:CustomerService
  ){
   }


  ngOnInit(): void {
    let custNum = this._activatedRoute.snapshot.paramMap.get('custnum') ;
    let parsedCustomerNumber:number = parseInt(custNum || "0");

    this._customerService.getCustomer(parsedCustomerNumber).subscribe({
      next:(data)=>{
        let responseFromCustomer = data.response;
        let customerJsonText = responseFromCustomer.CustomerJsonText;
        this.customer = JSON.parse(customerJsonText).ttCustomer[0];
      }, error:(err)=>{
        console.log('Error occured while accessing individual customer.');
      }
    });
  }

}
