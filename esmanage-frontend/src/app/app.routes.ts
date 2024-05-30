import { Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {ItemListComponent} from "./electro-item/item-list/item-list.component";
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";
import {PurchaseListComponent} from "./purchase/purchase-list/purchase-list.component";
import {ElectroTypeListComponent} from "./reference-book/electro-type/electro-type-list/electro-type-list.component";
import {
  PositionTypeListComponent
} from "./reference-book/position-type/position-type-list/position-type-list.component";
import {
  PurchaseTypeListComponent
} from "./reference-book/purchase-type/purchase-type-list/purchase-type-list.component";
import {ShopListComponent} from "./reference-book/shop/shop-list/shop-list.component";

export const routes: Routes = [

  {path: '', outlet: 'navbar', component: NavbarComponent},

  {path: 'item-list', component: ItemListComponent},
  {path: 'employee-list', component: EmployeeListComponent},
  {path: 'purchase-list', component: PurchaseListComponent},
  {path: 'electro-type-list', component: ElectroTypeListComponent},
  {path: 'position-type-list', component: PositionTypeListComponent},
  {path: 'purchase-type-list', component: PurchaseTypeListComponent},
  {path: 'shop-list', component: ShopListComponent},

];
