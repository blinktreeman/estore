import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";
import {Observable} from "rxjs";
import {PositionType} from "../models/positionType";
import {EmployeeWithSalesAmountDto} from "../models/employeeWithSalesAmountDto";
import {StatRequest} from "../models/statRequest";
import {EmployeeWithSalesSumDto} from "../models/employeeWithSalesSumDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  getPositionTypeList(): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(`${this.BASE_URL}/position-type/all`)
  }

  getAmountStatistic(statRequest: StatRequest): Observable<EmployeeWithSalesAmountDto[]> {
    return this.http.post<EmployeeWithSalesAmountDto[]>(`${this.BASE_URL}/purchase/amount-stat`, statRequest)
  }

  getSumStatistic(statRequest: StatRequest): Observable<EmployeeWithSalesSumDto[]> {
    return this.http.post<EmployeeWithSalesSumDto[]>(`${this.BASE_URL}/purchase/sum-stat`, statRequest)
  }

}
