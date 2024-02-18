// qlsp.service.ts
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QlspService {
  private apiSP = 'http://localhost:3200/nuochoa'; // Điều chỉnh URL của bạn
  private apiTH = 'http://localhost:3200/thuonghieu/'; // Điều chỉnh URL của bạn
  private apiL = 'http://localhost:3200/loai/'; // Điều chỉnh URL của bạn

  // Subject để thông báo về thay đổi trong dữ liệu
  private dataUpdated = new Subject<void>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  getAllLoai(): Observable<any[]> {
    return this.http.get<any[]>(this.apiL);
  }
  
  getAllThuongHieu(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTH);
  }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiSP);
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get<any>(this.apiTH + `get-once/${id}`);
  }

  getAllProductsWithBrand(): Observable<any[]> {
    return forkJoin([this.getAllProducts(), this.getAllBrands()]).pipe(
      map(([products, brands]: [any[], any[]]) => {
        const updatedProducts = products.map((product: any) => ({
          ...product,
          TenTH: this.getBrandNameById(product.MaTH, brands),
        }));
        return updatedProducts;
      })
    );
  }
  private getAllBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTH);
  }
  private getBrandNameById(id: number, brands: any[]): string {
    const brand = brands.find((brand) => brand.IDTH === id);
    return brand ? brand.TenTH : 'Unknown Brand';
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
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiSP}/get-once/${id}`);
  }

  /////
  addProduct(productData: any): Observable<any> {
    const url = `${this.apiSP}/add`;
    return this.http.post(url, productData);
  }

  updateProduct(id: number, productData: any): Observable<any> {
    const url = `${this.apiSP}/update/${id}`;
    return this.http.post(url, productData);
  }

  removeProduct(id: number): Observable<any> {
    const url = `${this.apiSP}/remove/${id}`;
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
