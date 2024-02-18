// qlcthd.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QlcthdService } from './qlcthd.service';

@Component({
  selector: 'app-qlcthd',
  templateUrl: './qlcthd.component.html',
  styleUrls: ['./qlcthd.component.scss'],
})
export class QlcthdComponent implements OnInit, OnDestroy {
  data: any[] = [];
  showForm: boolean = false;
  formData: any = {};
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: QlcthdService,
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
    this.dataService.getAllIvoiceDetailsWithProduct().subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });
  
  }

  /////

  // navigateToAddProduct(): void {
  //   this.router.navigate(['add-product']);
  // }



  removeIvoiceDetail(id: number): void {

    this.dataService.removeIvoiceDetail(id).subscribe(
      () => {
        console.log('CT Hóa đơn đã được xóa thành công');
        // Không cần phải gọi loadData() ở đây vì đã đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
      },
      (error) => {
        console.error('Lỗi khi xóa CT Hóa đơn', error);
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

  
  