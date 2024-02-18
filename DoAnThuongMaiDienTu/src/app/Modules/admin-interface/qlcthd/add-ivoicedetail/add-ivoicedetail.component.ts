// add-ivoicedetail.component.ts
import { Component, OnInit } from '@angular/core';
import { QlcthdService } from '../qlcthd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ivoicedetail',
  templateUrl: './add-ivoicedetail.component.html',
  styleUrls: ['./add-ivoicedetail.component.scss'],
})
export class AddIvoicedetailComponent implements OnInit{
  formData: any = {};
  hdList: any[] = [];
  nhList: any[]=[];
  
  constructor(private qlcthdService: QlcthdService, private router: Router) {}
  ngOnInit() {
    this.loadHDList();
    this.loadNHList();
  }
  loadHDList() {
    this.qlcthdService.getAllIvoices().subscribe(
      (data) => {
        this.hdList = data;
        console.log(this.hdList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách khach hang', error);
      }
    );
  }

  loadNHList() {
    this.qlcthdService.getAllProducts().subscribe(
      (data) => {
        this.nhList = data;
        console.log(this.nhList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách khach hang', error);
      }
    );
  }

  addIvoiceDetail(): void {
    this.qlcthdService.addIvoiceDetail(this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được thêm thành công');
        // Chuyển hướng người dùng trở lại trang qlcthd
        this.router.navigate(['admin/qlcthd']);
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm', error);
      }
    );
  }
}
