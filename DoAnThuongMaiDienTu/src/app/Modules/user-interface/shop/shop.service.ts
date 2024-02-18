import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiSP = 'http://localhost:3200/nuochoa'; // Điều chỉnh URL của bạn
  private apiL = 'http://localhost:3200/loai'; 
  private apiTH = 'http://localhost:3200/thuonghieu'; 
  private apiMLSP = 'http://localhost:3200/nuochoa/get-maL/'; // Điều chỉnh URL của bạn
  private apiMTHSP = 'http://localhost:3200/nuochoa/get-maTH/'; // Điều chỉnh URL của bạn


  constructor(private http: HttpClient) {}
  getSP(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiSP}/`);
  }

  getL(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiL}/`);
  }

  getTH(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiTH}/`);
  }

  
  getProductByCate(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiMLSP}${id}`);
  }

  getProductByBrand(idth: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiMTHSP}${idth}`);
  }



}
