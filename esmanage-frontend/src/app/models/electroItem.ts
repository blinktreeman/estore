import {ElectroType} from "./electroType";
import {ElectroShop} from "./electroShop";

export class ElectroItem {
  id?: bigint;
  name?: string;
  electroType?: ElectroType;
  price?: number;
  count?: number;
  archive?: boolean;
  description?: string;
}
