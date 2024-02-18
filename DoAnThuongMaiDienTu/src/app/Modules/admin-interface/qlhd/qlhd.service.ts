// qlhd.service.ts
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QlhdService {
  private apiSP = 'http://localhost:3200/nuochoa'; // Điều chỉnh URL của bạn
  private apiKH = 'http://localhost:3200/khachhang/'; // Điều chỉnh URL của bạn
  private apiHD = 'http://localhost:3200/hoadon'; // Điều chỉnh URL của bạn
  private apiCTHD = 'http://localhost:3200/cthoadon'; // Điều chỉnh URL của bạn
  private apiHDL = 'http://localhost:3200/hoadon/latestt'; // Điều chỉnh URL của bạn

  // Subject để thông báo về thay đổi trong dữ liệu
  private dataUpdated = new Subject<void>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getAllSP(): Observable<any[]> {
    return this.http.get<any[]>(this.apiSP);
  }

  getAllIvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiHD);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.apiSP + `get-once/${id}`);
  }



  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiKH);
  }
  private getCustomerNameById(id: number, customers: any[]): string {
    const customer = customers.find((customer) => customer.ID === id);
    return customer ? customer.TenKH : 'Unknown product';
  }

  getAllIvoicesWithCustomers(): Observable<any[]> {
    return forkJoin([this.getAllIvoices(), this.getAllCustomers()]).pipe(
      map(([ivoices, customer]: [any[], any[]]) => {
        const updatedIvoices = ivoices.map((ivoice: any) => ({
          ...ivoice,
          TenKH: this.getCustomerNameById(ivoice.MaKH, customer),
        }));
        return updatedIvoices;
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
  getIvoiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiHD}/get-once/${id}`);
  }

  /////
  getIvoiceLatest(): Observable<any> {
    return this.http.get<any[]>(this.apiHDL);
  }
  addIvoice(ivoiceData: any): Observable<any> {
    const url = `${this.apiHD}/add`;
    return this.http.post(url, ivoiceData);
  }

  updateIvoice(id: number, ivoiceData: any): Observable<any> {
    const url = `${this.apiHD}/update/${id}`;
    return this.http.post(url, ivoiceData);
  }



  


  removeIvoiceDetail(id: number): Observable<any> {
    const urll = `${this.apiCTHD}/removebyMHD/${id}`;
    return this.http.get(urll, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Giả sử server trả về một chuỗi thông báo
        console.log('Xóa CTHD thành công:', response);
        this.notifyDataUpdated();
      })
    );
  }

  removeIvoice(id: number): Observable<any> {
    const url = `${this.apiHD}/remove/${id}`;
    // this.removeIvoiceDetail(id);
    // Gọi API để xóa sản phẩm và sau đó thông báo về thay đổi trong dữ liệu
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Giả sử server trả về một chuỗi thông báo
        console.log('Xóa HD thành công:', response);
        this.notifyDataUpdated();
      })
    );
  }
}
