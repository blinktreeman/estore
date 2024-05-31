import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PurchaseType} from "../../models/purchaseType";

@Injectable({
  providedIn: 'root'
})
export class PurchaseTypeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createPurchaseType(purchaseType: PurchaseType): Observable<PurchaseType> {
    return this.http.post<PurchaseType>(`${this.BASE_URL}/purchase-type`, purchaseType)
  }

  getPurchaseTypeById(id: bigint | undefined): Observable<PurchaseType> {
    return this.http.get<PurchaseType>(`${this.BASE_URL}/purchase-type?id=${id}`)
  }

  getPurchaseTypeList(): Observable<PurchaseType[]> {
    return this.http.get<PurchaseType[]>(`${this.BASE_URL}/purchase-type/all`)
  }

  updatePurchaseType(purchaseType: PurchaseType): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/purchase-type`, purchaseType);
  }

  deletePurchaseTypeById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/purchase-type?id=${id}`);
  }

}
