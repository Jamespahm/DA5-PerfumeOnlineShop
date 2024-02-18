// qlhd.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QlhdService } from './qlhd.service';

@Component({
  selector: 'app-qlhd',
  templateUrl: './qlhd.component.html',
  styleUrls: ['./qlhd.component.scss'],
})
export class QlhdComponent implements OnInit, OnDestroy {
  data: any[] = [];
  showForm: boolean = false;
  formData: any = {};
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: QlhdService,
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
    this.dataService.getAllIvoicesWithCustomers().subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });
  
  }

  /////

  // navigateToAddProduct(): void {
  //   this.router.navigate(['add-product']);
  // }



  removeIvoice(id: number): void {
    this.dataService.removeIvoiceDetail(id).subscribe(
      () => {
        console.log('CT Hóa đơn đã được xóa thành công');
        // Không cần phải gọi loadData() ở đây vì đã đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
      },
      (error) => {
        console.error('Lỗi khi xóa CT Hóa đơn', error);
      }
    );
    this.dataService.removeIvoice(id).subscribe(
      () => {
        console.log('Hóa đơn đã được xóa thành công');
        // Không cần phải gọi loadData() ở đây vì đã đăng ký lắng nghe sự kiện thay đổi trong dữ liệu
      },
      (error) => {
        console.error('Lỗi khi xóa Hóa đơn', error);
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

  
  