import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerApiUrl = environment.customerApiUrl + "/CustomerInformation/rest/CustomerInformationService/Customers";

  constructor(private http: HttpClient) { }

  getCustomers(){
    let customerResponse = this.http.get<any>(this.customerApiUrl);
    console.log(customerResponse);
    //TODO : This method should be returning cutomer[] of observable type.
  }
}
