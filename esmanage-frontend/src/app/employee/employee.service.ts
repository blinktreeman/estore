import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.BASE_URL}/employee`, employee)
  }

  getEmployeeById(id: bigint | undefined): Observable<Employee> {
    return this.http.get<Employee>(`${this.BASE_URL}/employee?id=${id}`)
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/employee/all`)
  }

  updateEmployee(employee: Employee): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/employee`, employee);
  }

  deleteEmployeeById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/employee?id=${id}`);
  }

}
