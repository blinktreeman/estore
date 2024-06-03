import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shop} from "../../models/shop";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(`${this.BASE_URL}/shop`, shop)
  }

  saveAll(shopList: Shop[] | undefined): Observable<Shop[]> {
    return this.http.post<Shop[]>(`${this.BASE_URL}/shop/save-all`, shopList);
  }

  getShopById(id: bigint | undefined): Observable<Shop> {
    return this.http.get<Shop>(`${this.BASE_URL}/shop?id=${id}`)
  }

  getShopList(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.BASE_URL}/shop/all`)
  }

  updateShop(shop: Shop): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/shop`, shop);
  }

    deleteShopById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/shop?id=${id}`);
  }
}
