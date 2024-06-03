import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {PositionType} from "../models/positionType";
import {Shop} from "../models/shop";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.BASE_URL}/employee`, employee)
  }

  saveAll(entityList: Employee[] | undefined): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${this.BASE_URL}/employee/save-all`, entityList);
  }

  getEmployeeById(id: bigint | undefined): Observable<Employee> {
    return this.http.get<Employee>(`${this.BASE_URL}/employee?id=${id}`)
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/employee/all`)
  }

  getPositionTypeList(): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(`${this.BASE_URL}/position-type/all`)
  }

  getShopList(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.BASE_URL}/shop/all`)
  }

  updateEmployee(employee: Employee): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/employee`, employee);
  }

  deleteEmployeeById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/employee?id=${id}`);
  }

}
