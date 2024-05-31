import {Injectable} from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Purchase} from "../models/purchase";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.BASE_URL}/purchase`, purchase)
  }

  getPurchaseById(id: bigint | undefined): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.BASE_URL}/purchase?id=${id}`)
  }

  getPurchaseList(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.BASE_URL}/purchase/all`)
  }

  updatePurchase(purchase: Purchase): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/purchase`, purchase);
  }

  deletePurchaseById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/purchase?id=${id}`);
  }

}
