import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositionType} from "../../models/positionType";

@Injectable({
  providedIn: 'root'
})
export class PositionTypeService {

  private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createPositionType(positionType: PositionType): Observable<PositionType> {
    return this.http.post<PositionType>(`${this.BASE_URL}/position-type`, positionType)
  }

  getPositionTypeById(id: bigint | undefined): Observable<PositionType> {
    return this.http.get<PositionType>(`${this.BASE_URL}/position-type?id=${id}`)
  }

  getPositionTypeList(): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(`${this.BASE_URL}/position-type/all`)
  }

  updatePositionType(positionType: PositionType): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/position-type`, positionType);
  }

  deletePositionTypeById(id: bigint | undefined): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/position-type?id=${id}`);
  }

}
