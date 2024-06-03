import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {ElectroType} from "../../models/electroType";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  electroItemList: ElectroItem[] | undefined;
  electroItem: ElectroItem = new ElectroItem();
  electroTypeList: ElectroType[] | undefined;
  protected readonly ElectroType = ElectroType;

  constructor(private service: ItemService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getItemList();
    this.getElectroTypeList();
  }

  private getItemList() {
    this.service.getElectroItemList().subscribe({
      next: value => {
        this.electroItemList = value;
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

  itemDetails(id: bigint | undefined) {
    this.service.getElectroItemById(id).subscribe({
      next: value => {
        this.router.navigate(['/item-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createItem() {
    this.service.createElectroItem(this.electroItem).subscribe({
      next: value => {
        this.electroItemList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: ElectroItem[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToElectroItem(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToElectroItem(entry: any) {
    const electroItem = {} as ElectroItem;
    electroItem.id = entry[0];
    electroItem.name = entry[1];
    let electroTypeId: bigint = entry[2];
    electroItem.electroType = this.electroTypeList?.find(electroType => electroType.id == electroTypeId);
    electroItem.price = Number(entry[3]);
    electroItem.count = Number(entry[4]);
    electroItem.archive = Boolean(Number(entry[5]));
    electroItem.description = entry[6];
    return electroItem;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.electroItemList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }

}
