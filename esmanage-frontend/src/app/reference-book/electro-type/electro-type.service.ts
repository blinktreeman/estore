import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ElectroType} from "../../models/electroType";

@Injectable({
  providedIn: 'root'
})
export class ElectroTypeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createElectroType(electroType: ElectroType): Observable<ElectroType> {
    return this.http.post<ElectroType>(`${this.BASE_URL}/electro-type`, electroType)
  }

  saveAll(entityList: ElectroType[] | undefined): Observable<ElectroType[]> {
    return this.http.post<ElectroType[]>(`${this.BASE_URL}/electro-type/save-all`, entityList);
  }

  getElectroTypeById(id: bigint | undefined): Observable<ElectroType> {
    return this.http.get<ElectroType>(`${this.BASE_URL}/electro-type?id=${id}`)
  }

  getElectroTypeList(): Observable<ElectroType[]> {
    return this.http.get<ElectroType[]>(`${this.BASE_URL}/electro-type/all`)
  }

  updateElectroType(electroType: ElectroType): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/electro-type`, electroType);
  }

  deleteElectroTypeById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/electro-type?id=${id}`);
  }
}
