import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerApiUrl = environment.customerApiUrl + "/Customers";

  constructor() { }
}
