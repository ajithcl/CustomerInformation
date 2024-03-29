import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customer = new Customer();
  customer_header = '';
  isNewCustomer:boolean=true;
  buttonUpdateLabel:string='Add';

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _customerService:CustomerService,
    private _router:Router
    ){ 
    this.customer_header = "New Customer";
    this.isNewCustomer = true;
  }

  ngOnInit(): void {
    let custNum = this._activatedRoute.snapshot.paramMap.get('custnum') ;
    let parsedCustomerNumber:number = parseInt(custNum || "0");

    if (parsedCustomerNumber != 0){
      this._customerService.getCustomer(parsedCustomerNumber).subscribe({
        next:(data)=>{
          let responseFromCustomer = data.response;
          let customerJsonText = responseFromCustomer.CustomerJsonText;
          this.customer = JSON.parse(customerJsonText).ttCustomer[0];
          this.customer_header = 'Customer number: ' + custNum;
          this.isNewCustomer = false;
          this.buttonUpdateLabel = 'Save';
        }, error:(err)=>{
          this.isNewCustomer=false;
          alert('Error occured while accessing individual customer.');
        }
      });
    }
    else{
      console.log (' New Customer');
    }
  }

  CancelAction():void{
    if (this.isNewCustomer){
      this._router.navigate(['/customers']);
    }
    else{
      window.close();
    }
  }

  //TODO
  AddUpdateCustomer():boolean{
    this._customerService.addCustomer(this.customer).subscribe({
      next:(responseData)=>{
        console.log(' AddUpdateCustomer responseData: ' , responseData);
      }, error: (responseError)=>{
        console.log ('ResponseError', responseError)
      }
    })
    return false;
  }

  DeleteAction():void{
    let custNum = this._activatedRoute.snapshot.paramMap.get('custnum');
    let parsedCustomerNumber: number = parseInt(custNum || "0");
    event?.preventDefault(); //ToDO: event is depreciated.
    this._customerService.deleteCustomer(parsedCustomerNumber).subscribe({
      next:(responseData)=>{
        let processResponse = JSON.parse(responseData.response.processResponse);
        console.log(processResponse);
        console.log('delete status', processResponse.status);
        console.log('response message', processResponse.message);
        if (processResponse.status){
          window.close();
        }
        else{
          alert("Unable to delete customer." + processResponse.message);
        }
        
      }, error:(responseError)=>{
        alert(responseError); //ToDO : parse this object and show error message.
        console.log('delete',responseError);
      }
    })
  }

}
