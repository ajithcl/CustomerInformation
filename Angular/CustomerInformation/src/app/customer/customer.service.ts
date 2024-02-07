import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerApiUrl = environment.customerApiUrl + "/CustomerInformation/rest/CustomerInformationService/Customers";
  private _customerViewApiUrl = environment.customerApiUrl + "/CustomerInformation/rest/CustomerInformationService/Customer/";
  private _customerAddUrl = environment.customerApiUrl + "/CustomerInformation/rest/CustomerInformationService/Customer/Add";
  private __customerDeleteUrl = environment.customerApiUrl + "/CustomerInformation/rest/CustomerInformationService/Customer/Delete/";

  constructor(private http: HttpClient) { }

  getCustomers():Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    //console.log('Url: ' + this.customerApiUrl);
    return this.http.get<any>(this.customerApiUrl,{headers});
  }

  getCustomer(customerNumber:number):Observable<any>{
    return this.http.get<any>(this._customerViewApiUrl + customerNumber);
  }

  addCustomer(customer:Customer):Observable<any>{
    return this.http.post<any>(this._customerAddUrl, customer);
  }

  deleteCustomer(customerNumber:number):Observable<any>{
    return this.http.delete<any>(this.__customerDeleteUrl + customerNumber);
  }
}
