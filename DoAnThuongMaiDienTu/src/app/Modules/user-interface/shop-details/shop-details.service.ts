import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopDetailsService {
  private apiSP = 'http://localhost:3200/nuochoa/get-once/'; // Điều chỉnh URL theo API của bạn
  private apiAllSP = 'http://localhost:3200/nuochoa'; // Điều chỉnh URL của bạn
  private apiCTSP = 'http://localhost:3200/ctnuochoa/get-once/'; // Điều chỉnh URL của bạn
  private apiAllCTSP = 'http://localhost:3200/ctnuochoa'; // Điều chỉnh URL của bạn
  private apiMLSP = 'http://localhost:3200/nuochoa/get-maL/'; // Điều chỉnh URL theo API của bạn

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiAllSP}`);
  }


  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiSP}${id}`);
  }

  getDetailProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiCTSP}${id}`);
  }


}
