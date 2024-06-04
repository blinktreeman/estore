import { Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {EmployeeComponent} from "./employee/employee.component";
import {PurchaseComponent} from "./purchase/purchase.component";

export const routes: Routes = [

  {path: '', outlet: 'navbar', component: NavbarComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'purchase', component: PurchaseComponent},

  {path: '', redirectTo: 'employee', pathMatch: "full"},

];
