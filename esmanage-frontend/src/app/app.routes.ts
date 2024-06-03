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
import {ShopDetailsComponent} from "./reference-book/shop/shop-details/shop-details.component";
import {
  ElectroTypeDetailsComponent
} from "./reference-book/electro-type/electro-type-details/electro-type-details.component";
import {
  PositionTypeDetailsComponent
} from "./reference-book/position-type/position-type-details/position-type-details.component";
import {
  PurchaseTypeDetailsComponent
} from "./reference-book/purchase-type/purchase-type-details/purchase-type-details.component";
import {ItemDetailsComponent} from "./electro-item/item-details/item-details.component";
import {EmployeeDetailsComponent} from "./employee/employee-details/employee-details.component";
import {PurchaseDetailsComponent} from "./purchase/purchase-details/purchase-details.component";

export const routes: Routes = [

  {path: '', outlet: 'navbar', component: NavbarComponent},

  {path: 'item-list', component: ItemListComponent},
  {path: 'item-details/:id', component: ItemDetailsComponent},


  {path: 'employee-list', component: EmployeeListComponent},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},

  {path: 'purchase-list', component: PurchaseListComponent},
  {path: 'purchase-details/:id', component: PurchaseDetailsComponent},

  {path: 'electro-type-list', component: ElectroTypeListComponent},
  {path: 'electro-type-details/:id', component: ElectroTypeDetailsComponent},

  {path: 'position-type-list', component: PositionTypeListComponent},
  {path: 'position-type-details/:id', component: PositionTypeDetailsComponent},

  {path: 'purchase-type-list', component: PurchaseTypeListComponent},
  {path: 'purchase-type-details/:id', component: PurchaseTypeDetailsComponent},

  {path: 'shop-list', component: ShopListComponent},
  {path: 'shop-details/:id', component: ShopDetailsComponent},

];
