import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {PositionType} from "../models/positionType";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {EmployeeWithSalesAmountDto} from "../models/employeeWithSalesAmountDto";
import {StatRequest} from "../models/statRequest";
import {EmployeeWithSalesSumDto} from "../models/employeeWithSalesSumDto";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService) {
  }

  positionTypeList: PositionType[] = [];

  ngOnInit(): void {
    this.getPositionTypeList();
  }

  // Получить список должностей для фильтра
  private getPositionTypeList() {
    this.service.getPositionTypeList().subscribe({
      next: value => {
        this.positionTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  // Фильтр по должности
  protected selectedPositionType: PositionType = new PositionType();
  protected readonly PositionType = PositionType;

  onChangePositionType(positionType: PositionType) {
    this.selectedPositionType = positionType;
  }

  // Фильтр по датам
  protected fromDateFilter: Date = new Date();
  protected toDateFilter: Date = new Date();

  // Статистика по количеству продаж
  amountStatisticList: EmployeeWithSalesAmountDto[] = [];

  getAmountStatistic() {
    let statRequest: StatRequest = {
      positionTypeId: this.selectedPositionType.id,
      fromDate: this.fromDateFilter,
      toDate: this.toDateFilter
    }
    this.service.getAmountStatistic(statRequest)
      .subscribe({
      next: value => {
        this.amountStatisticList = value;
      },
      error: err => console.log(err)
    });
  }

  // Статистика по суммам продаж
  sumStatisticList: EmployeeWithSalesSumDto[] = [];
  getSumStatistic() {
    let statRequest: StatRequest = {
      positionTypeId: this.selectedPositionType.id,
      fromDate: this.fromDateFilter,
      toDate: this.toDateFilter
    }
    this.service.getSumStatistic(statRequest)
      .subscribe({
        next: value => {
          this.sumStatisticList = value;
        },
        error: err => console.log(err)
      });
  }

  getStatistic() {
    this.getAmountStatistic();
    this.getSumStatistic();
  }

}
