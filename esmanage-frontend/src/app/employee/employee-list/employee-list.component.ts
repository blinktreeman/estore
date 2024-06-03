import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Employee} from "../../models/employee";
import {PositionType} from "../../models/positionType";
import {Shop} from "../../models/shop";
import {EmployeeService} from "../employee.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {ElectroItem} from "../../models/electroItem";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] | undefined;
  employee: Employee = new Employee();
  positionTypeList: PositionType[] | undefined;
  shopList: Shop[] | undefined;

  protected readonly PositionType = PositionType;
  protected readonly Shop = Shop;

  constructor(private service: EmployeeService,
              private router: Router,
              private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getPositionTypeList();
    this.getShopList();
  }

  private getEmployeeList() {
    this.service.getEmployeeList().subscribe({
      next: value => {
        this.employeeList = value;
      },
      error: err => console.log(err)
    });
  }

  // Получить список должностей
  private getPositionTypeList() {
    this.service.getPositionTypeList().subscribe({
      next: value => {
        this.positionTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  // Получить список магазинов
  private getShopList() {
    this.service.getShopList().subscribe({
      next: value => {
        this.shopList = value;
      },
      error: err => console.log(err)
    });
  }

  onChangePositionType(positionType: PositionType) {
    this.employee.positionType = positionType;
  }

  onChangeShop(shop: Shop) {
    this.employee.shop = shop;
  }

  employeeDetails(id: bigint | undefined) {
    this.service.getEmployeeById(id).subscribe({
      next: value => {
        this.router.navigate(['/employee-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createEmployee() {
    this.service.createEmployee(this.employee).subscribe({
      next: value => {
        this.employeeList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  header: boolean = false;
  importedData: Employee[] | undefined;

  onFileSelected(event: any): void {
    let file: File = event.target.files[0];
    if (file && file.size > 0) {

      this.header = (this.header as unknown as string) === 'true' || this.header;

      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';', encoding: 'windows-1251'})
        .pipe().subscribe({
        next: (result) => {
          if (!(result instanceof NgxCSVParserError)) {
            this.importedData = result.map(entry => this.mapToEmployee(entry));
            this.importedData.shift();
          }
        },
        error: (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      });
    }
  }

  private mapToEmployee(entry: any) {

    const employee = {} as Employee;
    employee.id = entry[0];
    employee.lastName = entry[1];
    employee.firstName = entry[2];
    employee.patronymic = entry[3];
    const [day, month, year] = entry[4].split(".");
    employee.birthDate = new Date(year + "-" + month + "-" + day);
    let positionTypeId: bigint = entry[5];
    employee.positionType = this.positionTypeList?.find(positionType => positionType.id == positionTypeId);
    let shopId: bigint = entry[6];
    employee.shop = this.shopList?.find(shop => shop.id == shopId);
    employee.gender = Boolean(Number(entry[7]));

    return employee;
  }

  saveImportedDataToDatabase() {
    this.service.saveAll(this.importedData).subscribe({
      next: value => {
        value.forEach(entity => this.employeeList?.push(entity));
        this.importedData = [];
      },
      error: err => console.log(err)
    });
  }
}
