import {Component, OnInit} from '@angular/core';
import {Shop} from "../../../models/shop";
import {ShopService} from "../shop.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css'
})
export class ShopListComponent implements OnInit {

  shopList: Shop[] | undefined;
  shop: Shop = new Shop();

  constructor(private service: ShopService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getShopList();
  }

  private getShopList() {
    this.service.getShopList().subscribe({
      next: value => {
        this.shopList = value;
      },
      error: err => console.log(err)
    });
  }

  shopDetails(id: bigint | undefined) {
    this.service.getShopById(id).subscribe({
      next: value => {
        this.router.navigate(['/shop-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createShop() {
    this.service.createShop(this.shop).subscribe({
      next: value => {
        this.shopList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: Shop[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToShop(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToShop(entry: any) {
    const shop = {} as Shop;
    shop.id = entry[0];
    shop.name = entry[1];
    shop.address = entry[2];
    return shop;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.shopList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
