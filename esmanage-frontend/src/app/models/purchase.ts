import {ElectroItem} from "./electroItem";
import {Employee} from "./employee";
import {PurchaseType} from "./purchaseType";
import {Shop} from "./shop";

export class Purchase {
  id?: bigint;
  electroItem?: ElectroItem;
  employee?: Employee;
  purchaseDate?: Date;
  purchaseType?: PurchaseType;
  shop?: Shop;
}
