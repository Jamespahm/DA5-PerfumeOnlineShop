// qlcthd.service.ts
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QlcthdService {
  private apiSP = 'http://localhost:3200/nuochoa'; // Điều chỉnh URL của bạn
  private apiKH = 'http://localhost:3200/khachhang/'; // Điều chỉnh URL của bạn
  private apiHD = 'http://localhost:3200/hoadon'; // Điều chỉnh URL của bạn
  private apiCTHD = 'http://localhost:3200/cthoadon'; // Điều chỉnh URL của bạn

  // Subject để thông báo về thay đổi trong dữ liệu
  private dataUpdated = new Subject<void>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getAllIvoiceDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCTHD);
  }
  
  getAllIvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiHD);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.apiSP + `get-once/${id}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiSP);
  }
  getProductNameById(id: number, products: any[]): string {
    const product = products.find((product) => product.ID === id);
    return product ? product.TenNH : 'Unknown product';
  }
  
  getProductImageById(id: number, products: any[]): string {
    const product = products.find((product) => product.ID === id);
    return product ? product.HinhAnh : 'Unknown product';
  }
  
  getAllIvoiceDetailsWithProduct(): Observable<any[]> {
    return forkJoin([
      this.getAllIvoiceDetails(),
      this.getAllProducts(),
    ]).pipe(
      map(([ivoicedetails, products]: [any[], any[]]) => {
        const updatedIvoicedetails = ivoicedetails.map((ivoicedetail: any) => ({
          ...ivoicedetail,
          TenNH: this.getProductNameById(ivoicedetail.MaNH, products),
          HinhAnh: this.getProductNameById(ivoicedetail.hinhAnh, products),
        }));
        return updatedIvoicedetails;
      })
    );
  }
  /////
  // Phương thức để thông báo về thay đổi trong dữ liệu
  notifyDataUpdated(): void {
    this.dataUpdated.next();
  }

  // Phương thức để đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
  getDataUpdated(): Observable<void> {
    return this.dataUpdated.asObservable();
  }
  getIvoiceDetailById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiCTHD}/get-once/${id}`);
  }

  /////

  addIvoiceDetail(ivoiceData: any): Observable<any> {
    const url = `${this.apiCTHD}/add`;
    return this.http.post(url, ivoiceData);
  }

  updateIvoiceDetail(id: number, ivoiceDetailData: any): Observable<any> {
    const url = `${this.apiCTHD}/update/${id}`;
    return this.http.post(url, ivoiceDetailData);
  }

  removeIvoiceDetail(id: number): Observable<any> {
    const url = `${this.apiCTHD}/remove/${id}`;
    // Gọi API để xóa sản phẩm và sau đó thông báo về thay đổi trong dữ liệu
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Giả sử server trả về một chuỗi thông báo
        console.log('Xóa sản phẩm thành công:', response);
        this.notifyDataUpdated();
      })
    );
  }
}
