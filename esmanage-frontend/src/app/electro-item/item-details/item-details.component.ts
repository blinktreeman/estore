import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ElectroType} from "../../models/electroType";
import {ElectroShopDto} from "../../models/electroShopDto";
import {ElectroShop} from "../../models/electroShop";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {ElectroShopPK} from "../../models/ElectroShopPK";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  id: bigint | undefined;
  electroItem: ElectroItem = new ElectroItem();
  electroTypeList: ElectroType[] | undefined;
  shopDtoList: ElectroShopDto[] = [];
  protected readonly ElectroType = ElectroType;

  constructor(private service: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getElectroItemById(this.id).subscribe({
      next: value => {
        this.electroItem = value;
      },
      error: err => console.log(err)
    });
    this.getElectroTypeList();
    this.getShopListWithElectroItemCount();
  }

  private getShopListWithElectroItemCount() {
    this.service.getShopListWithElectroItemCount(this.id).subscribe({
      next: value => {
        this.shopDtoList = value;
      },
      error: err => console.log(err)
    });
  }

  // Получить типы товаров для выбора типа при создании нового товара
  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  onChangeType(electroType: ElectroType) {
    this.electroItem.electroType = electroType;
  }

  updateElectroItem() {
    this.service.updateElectroItem(this.electroItem).subscribe({
      next: value => {
        this.electroItem = value;
      },
      error: err => console.log(err)
    });
  }

  deleteElectroItem() {
    this.service.deleteElectroItemById(this.electroItem.id).subscribe({
      next: value => {
        this.router.navigate(['/item-list']);
      },
      error: err => console.log(err)
    });
  }

  addedAmount: number = 0;
  electroShop: ElectroShop = new ElectroShop();

  setElectroShop(shop: ElectroShopDto, count: number) {
    this.electroShop.electroShopPK = {
      shop: shop,
      electroItem: this.electroItem,
    };
    this.electroShop.count = count;
  }

  updateElectroShop() {
    if (this.electroShop.count == null) {
      this.electroShop.count = this.addedAmount;
    } else {
      this.electroShop.count += this.addedAmount;
    }
    this.service.updateElectroShop(this.electroShop).subscribe({
      next: value => {
        let findName = value.electroShopPK?.shop?.name;
        let index = this.shopDtoList.findIndex(s => s.name === findName);
        this.shopDtoList[index].count = value.count;
      },
      error: err => console.log(err)
    });
  }

  /**
   * Распределение товара по магазинам в соответствие с данными csv-файла
   */
  header: boolean = false;
  importedData: ElectroShop[] | undefined;

  onFileSelected(event: any): void {

    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToElectroShop(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToElectroShop(entry: any) {

    const electroShopPK = {} as ElectroShopPK;
    const electroShop = { electroShopPK } as ElectroShop;

    let shopId: bigint = entry[0];
    this.service.getShopById(shopId).subscribe({
      next: value => electroShopPK.shop = value
    });

    let electroItemId: bigint = entry[1];
    this.service.getElectroItemById(electroItemId).subscribe({
      next: value => {
        electroShopPK.electroItem = value
      }
    });

    electroShop.count = Number(entry[2]);

    return electroShop;
  }

  saveImportedDataToDatabase() {
    this.importedData?.forEach(value => {
      this.service.updateElectroShop(value).subscribe({
        next: value => {
          if (value.electroShopPK?.electroItem?.id == this.electroItem.id) {
            let findName = value.electroShopPK?.shop?.name;
            let index = this.shopDtoList.findIndex(s => s.name === findName);
            this.shopDtoList[index].count = value.count;
          }
        },
        error: err => console.log(err)
      });
    });
    this.importedData = [];
  }
}
