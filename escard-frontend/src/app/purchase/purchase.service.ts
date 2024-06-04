import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ElectroType} from "../models/electroType";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getElectroTypeList(): Observable<ElectroType[]> {
    return this.http.get<ElectroType[]>(`${this.BASE_URL}/electro-type/all`)
  }

  getPurchaseSum(itemTypes: number[]): Observable<number> {
    return this.http.post<number>(`${this.BASE_URL}/purchase/sum-by-types`, itemTypes)
  }

  getPurchaseAmount(itemTypeId: number | undefined, maxPrice: number): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/purchase/amount-by-type?id=${itemTypeId}&price=${maxPrice}`)
  }
}
