import {Injectable} from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Purchase} from "../models/purchase";
import {ElectroItem} from "../models/electroItem";
import {ElectroType} from "../models/electroType";
import {Shop} from "../models/shop";
import {Employee} from "../models/employee";
import {PurchaseType} from "../models/purchaseType";
import {ElectroShop} from "../models/electroShop";

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

  getPurchaseTypeList(): Observable<PurchaseType[]> {
    return this.http.get<PurchaseType[]>(`${this.BASE_URL}/purchase-type/all`);
  }

  /**
   * Electro Item methods
   */

  getElectroItemListByTypeId(id: bigint | undefined): Observable<ElectroItem[]> {
    return this.http.get<ElectroItem[]>(`${this.BASE_URL}/electro-item/all-by-type-id?id=${id}`)
  }

  getElectroTypeList(): Observable<ElectroType[]> {
    return this.http.get<ElectroType[]>(`${this.BASE_URL}/electro-type/all`)
  }

  /**
   * Shop methods
   */

  getShopList(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.BASE_URL}/shop/all`)
  }

  /**
   * Employee methods
   */

  getEmployeeListByShopId(id: bigint | undefined): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/employee/all-by-shop-id?id=${id}`)
  }

  /**
   * Electro-Shop methods
   */
  getElectroShopByElectroItemIdAndShopId(itemId: bigint | undefined,
                                         shopId: bigint | undefined): Observable<ElectroShop> {
    return this.http
      .get<ElectroShop>(`${this.BASE_URL}/electro-shop/electro-shop-by-shop-item?item-id=${itemId}&shop-id=${shopId}`);
  }

}
