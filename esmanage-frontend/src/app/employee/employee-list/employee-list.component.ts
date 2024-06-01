import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Employee} from "../../models/employee";
import {PositionType} from "../../models/positionType";
import {Shop} from "../../models/shop";
import {EmployeeService} from "../employee.service";

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

  constructor(private service: EmployeeService,
              private router: Router) {
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

  protected readonly PositionType = PositionType;
  protected readonly Shop = Shop;

}
