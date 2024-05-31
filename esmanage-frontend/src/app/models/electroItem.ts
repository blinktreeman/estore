import {ElectroType} from "./electroType";

export class ElectroItem {
  id?: bigint;
  name?: string;
  electroType?: ElectroType;
  price?: number;
  count: number = 0;
  archive: boolean = false;
  description?: string;
}
