import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {Employee} from "../../models/employee";
import {PositionType} from "../../models/positionType";
import {Shop} from "../../models/shop";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  id: bigint | undefined;
  employeeList: Employee[] | undefined;
  employee: Employee = new Employee();
  positionTypeList: PositionType[] | undefined;
  shopList: Shop[] | undefined;

  constructor(private service: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getEmployeeById(this.id).subscribe({
      next: value => {
        this.employee = value;
      },
      error: err => console.log(err)
    });
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

  updateEmployee() {
    this.service.updateEmployee(this.employee).subscribe({
      next: value => {
        this.employee = value;
      },
      error: err => console.log(err)
    });
  }

  deleteEmployee() {
    this.service.deleteEmployeeById(this.employee.id).subscribe({
      next: value => {
        this.router.navigate(['/employee-list']);
      },
      error: err => console.log(err)
    });
  }

  protected readonly PositionType = PositionType;
  protected readonly Shop = Shop;

}
