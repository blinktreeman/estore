import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ElectroItem} from "../models/electroItem";
import {ElectroType} from "../models/electroType";
import {ElectroShopDto} from "../models/electroShopDto";
import {ElectroShop} from "../models/electroShop";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createElectroItem(electroItem: ElectroItem): Observable<ElectroItem> {
    return this.http.post<ElectroItem>(`${this.BASE_URL}/electro-item`, electroItem)
  }

  getElectroItemById(id: bigint | undefined): Observable<ElectroItem> {
    return this.http.get<ElectroItem>(`${this.BASE_URL}/electro-item?id=${id}`)
  }

  // Получить список магазинов с количеством по заданному материалу
  getShopListWithElectroItemCount(item_id: bigint | undefined): Observable<ElectroShopDto[]> {
    return this.http.get<ElectroShopDto[]>(`${this.BASE_URL}/shop/all-with-item-count?item_id=${item_id}`)
  }

  getElectroItemList(): Observable<ElectroItem[]> {
    return this.http.get<ElectroItem[]>(`${this.BASE_URL}/electro-item/all`)
  }

  updateElectroItem(electroItem: ElectroItem): Observable<ElectroItem> {
    return this.http.put<ElectroItem>(`${this.BASE_URL}/electro-item`, electroItem);
  }

  deleteElectroItemById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/electro-item?id=${id}`);
  }

  getElectroTypeList(): Observable<ElectroType[]> {
    return this.http.get<ElectroType[]>(`${this.BASE_URL}/electro-type/all`)
  }

  // Обновление пром. таблицы при изменении количества товара
  updateElectroShop(electroShop: ElectroShop): Observable<ElectroShop> {
    return this.http.put<ElectroShop>(`${this.BASE_URL}/electro-shop`, electroShop);
  }
}
