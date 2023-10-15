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

  constructor(private http: HttpClient) { }

  getCustomers():Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    console.log('Url: ' + this.customerApiUrl);
    return this.http.get<any>(this.customerApiUrl,{headers});

  }
}
