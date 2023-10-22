import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent} from './customer-view/customer-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/customers', pathMatch:'full'},
  {path: 'customers', component:CustomerComponent},
  {path: 'customer/:custnum', component:CustomerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
