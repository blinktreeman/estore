import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Purchase} from "../../models/purchase";
import {ElectroItem} from "../../models/electroItem";
import {ElectroType} from "../../models/electroType";
import {Shop} from "../../models/shop";
import {Employee} from "../../models/employee";
import {PurchaseService} from "../purchase.service";
import {Router} from "@angular/router";
import {PurchaseType} from "../../models/purchaseType";

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css'
})
export class PurchaseListComponent implements OnInit {

  constructor(private service: PurchaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.getPurchaseList();
  }

  purchaseList: Purchase[] = [];

  private getPurchaseList() {
    this.service.getPurchaseList().subscribe({
      next: value => {
        this.purchaseList = value;
      },
      error: err => console.log(err)
    });
  }

  purchaseDetails(id: bigint | undefined) {
    this.service.getPurchaseById(id).subscribe({
      next: value => {
        this.router.navigate(['/purchase-details', id]);
      },
      error: err => console.log(err)
    });
  }

  newPurchase: Purchase = new Purchase();

  createPurchase() {
    this.service.createPurchase(this.newPurchase).subscribe({
      next: value => {
        this.purchaseList.push(value);
      },
      error: err => console.log(err)
    });
  }

  electroTypeList: ElectroType[] = [];

  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  shopList: Shop[] = [];

  private getShopList() {
    this.service.getShopList().subscribe({
      next: value => {
        this.shopList = value;
      },
      error: err => console.log(err)
    });
  }

  employeeList: Employee[] = [];

  private getEmployeeListByShopId(id: bigint | undefined) {
    this.service.getEmployeeListByShopId(id).subscribe({
      next: value => {
        this.employeeList = value;
      },
      error: err => console.log(err)
    });
  }

  purchaseTypeList: PurchaseType[] = [];

  private getPurchaseTypeList() {
    this.service.getPurchaseTypeList().subscribe({
      next: value => {
        this.purchaseTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  protected readonly ElectroType = ElectroType;
  electroItemList: ElectroItem[] = [];

  onChangeElectroType(electroType: ElectroType) {
    this.service.getElectroItemListByTypeId(electroType.id).subscribe({
      next: value => {
        this.electroItemList = value;
      },
      error: err => console.log(err)
    });
  }

  protected readonly ElectroItem = ElectroItem;

  onChangeElectroItem(electroItem: ElectroItem) {
    this.newPurchase.electroItem = electroItem;
    if (this.newPurchase.shop != null) {
      this.service
        .getElectroShopByElectroItemIdAndShopId(this.newPurchase.electroItem.id, this.newPurchase.shop.id)
        .subscribe({
          next: value => {
            this.availableQuantityOfGoods = value.count;
            this.invalid = false;
          },
          error: err => {
            this.availableQuantityOfGoods = 0;
            this.invalid = true;
          }
        });
    }
  }

  protected readonly PurchaseType = PurchaseType;

  onChangePurchaseType(purchaseType: PurchaseType) {
    this.newPurchase.purchaseType = purchaseType;
  }

  protected readonly Shop = Shop;
  availableQuantityOfGoods: number = 0;
  invalid: boolean = true;

  onChangeShop(shop: Shop) {
    this.getEmployeeListByShopId(shop.id);
    this.newPurchase.shop = shop;
    if (this.newPurchase.electroItem != null) {
      this.service
        .getElectroShopByElectroItemIdAndShopId(this.newPurchase.electroItem.id, shop.id)
        .subscribe({
          next: value => {
            this.availableQuantityOfGoods = value.count;
            this.invalid = false;
          },
          error: err => {
            this.availableQuantityOfGoods = 0;
            this.invalid = true;
          }
        });
    }
  }

  protected readonly Employee = Employee;

  onChangeEmployee(employee: Employee) {
    this.newPurchase.employee = employee;
  }

  prepareCreating() {
    this.getElectroTypeList();
    this.getPurchaseTypeList();
    this.getShopList();
  }

}
