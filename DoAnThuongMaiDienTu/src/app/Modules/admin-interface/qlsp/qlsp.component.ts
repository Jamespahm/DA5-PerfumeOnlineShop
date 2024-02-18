// qlsp.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QlspService } from './qlsp.service';

@Component({
  selector: 'app-qlsp',
  templateUrl: './qlsp.component.html',
  styleUrls: ['./qlsp.component.scss'],
})
export class QlspComponent implements OnInit, OnDestroy {
  data: any[] = [];
  showForm: boolean = false;
  formData: any = {};
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: QlspService,
  ) {}

  ngOnInit() {
    this.loadData();

    // Subscribe to router events to detect navigation end
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      // Gọi loadData() sau khi quá trình điều hướng hoàn thành
      this.loadData();
    });

    // Đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
    this.dataService.getDataUpdated().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      // Gọi loadData() sau khi có thay đổi trong dữ liệu
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData(): void {
    this.dataService.getAllProductsWithBrand().subscribe((data) => {
      this.data = data;
    });
  }

  /////

  // navigateToAddProduct(): void {
  //   this.router.navigate(['add-product']);
  // }



  removeProduct(id: number): void {
    this.dataService.removeProduct(id).subscribe(
      () => {
        console.log('Sản phẩm đã được xóa thành công');
        // Không cần phải gọi loadData() ở đây vì đã đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm', error);
      }
    );
  }


  // Hàm để định dạng giá tiền với mã VND
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}

  
  