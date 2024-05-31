import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ElectroItem} from "../models/electroItem";
import {ElectroType} from "../models/electroType";

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

}
