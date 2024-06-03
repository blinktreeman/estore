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
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

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
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
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
    this.newPurchase.purchaseDate = new Date();
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
            console.log(err);
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
            console.log(err);
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

  /**
   * Импорт покупок из csv файла
   */
  header: boolean = false;
  importedData: Purchase[] | undefined;

  onFileSelected(event: any): void {

    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToPurchase(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToPurchase(entry: any) {

    const purchase = {} as Purchase;
    purchase.id = entry[0];

    let electroItemId: bigint = entry[1];
    this.service.getElectroItemById(electroItemId).subscribe({
      next: value => purchase.electroItem = value
    });

    let employeeId: bigint = entry[2];
    this.service.getEmployeeById(employeeId).subscribe({
      next: value => purchase.employee = value
    });

    const [day, month, year] = entry[3].split(".");
    purchase.purchaseDate = new Date(year + "-" + month + "-" + day);

    let purchaseTypeId: bigint = entry[4];
    this.service.getPurchaseTypeById(purchaseTypeId).subscribe({
      next: value => purchase.purchaseType = value
    });

    let importedSopId: bigint = entry[5];
    this.service.getShopById(importedSopId).subscribe({
      next: value => purchase.shop = value
    });

    return purchase;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.purchaseList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
