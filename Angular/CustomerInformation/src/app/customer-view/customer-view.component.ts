import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customer = new Customer();

  constructor(
    private _activatedRoute:ActivatedRoute
  ){ }

  ngOnInit(): void {
    let custNum = this._activatedRoute.snapshot.paramMap.get('custnum');
  }

}
