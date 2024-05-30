import {PositionType} from "./positionType";
import {Shop} from "./shop";

export class Employee {
  id?: bigint;
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  birthDate?: Date;
  position?: PositionType;
  shop?: Shop;
  gender?: boolean;
}
