import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ElectroType} from "../../../models/electroType";
import {Router} from "@angular/router";
import {ElectroTypeService} from "../electro-type.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

@Component({
  selector: 'app-electro-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './electro-type-list.component.html',
  styleUrl: './electro-type-list.component.css'
})
export class ElectroTypeListComponent implements OnInit {

  electroTypeList: ElectroType[] | undefined;
  electroType: ElectroType = new ElectroType();

  constructor(private service: ElectroTypeService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getElectroTypeList();
  }

  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  electroTypeDetails(id: bigint | undefined) {
    this.service.getElectroTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/electro-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createElectroType() {
    this.service.createElectroType(this.electroType).subscribe({
      next: value => {
        this.electroTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: ElectroType[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToElectroType(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToElectroType(entry: any) {
    const electroType = {} as ElectroType;
    electroType.id = entry[0];
    electroType.name = entry[1];
    return electroType;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.electroTypeList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
