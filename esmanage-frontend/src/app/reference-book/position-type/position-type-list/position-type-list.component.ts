import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PositionType} from "../../../models/positionType";
import {PositionTypeService} from "../position-type.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";

@Component({
  selector: 'app-position-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './position-type-list.component.html',
  styleUrl: './position-type-list.component.css'
})
export class PositionTypeListComponent implements OnInit {

  positionTypeList: PositionType[] | undefined;
  positionType: PositionType = new PositionType();

  constructor(private service: PositionTypeService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getPositionTypeList();
  }

  private getPositionTypeList() {
    this.service.getPositionTypeList().subscribe({
      next: value => {
        this.positionTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  positionTypeDetails(id: bigint | undefined) {
    this.service.getPositionTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/position-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createPositionType() {
    this.service.createPositionType(this.positionType).subscribe({
      next: value => {
        this.positionTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: PositionType[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToPositionType(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToPositionType(entry: any) {
    const positionType = {} as PositionType;
    positionType.id = entry[0];
    positionType.name = entry[1];
    return positionType;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.positionTypeList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
