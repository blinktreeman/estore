import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PurchaseType} from "../../../models/purchaseType";
import {PurchaseTypeService} from "../purchase-type.service";
import {Router} from "@angular/router";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

@Component({
  selector: 'app-purchase-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './purchase-type-list.component.html',
  styleUrl: './purchase-type-list.component.css'
})
export class PurchaseTypeListComponent implements OnInit {

  purchaseTypeList: PurchaseType[] | undefined;
  purchaseType: PurchaseType = new PurchaseType();

  constructor(private service: PurchaseTypeService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getPurchaseTypeList();
  }

  private getPurchaseTypeList() {
    this.service.getPurchaseTypeList().subscribe({
      next: value => {
        this.purchaseTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  purchaseTypeDetails(id: bigint | undefined) {
    this.service.getPurchaseTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/purchase-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createPurchaseType() {
    this.service.createPurchaseType(this.purchaseType).subscribe({
      next: value => {
        this.purchaseTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: PurchaseType[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToPurchaseType(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToPurchaseType(entry: any) {
    const purchaseType = {} as PurchaseType;
    purchaseType.id = entry[0];
    purchaseType.name = entry[1];
    return purchaseType;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.purchaseTypeList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
