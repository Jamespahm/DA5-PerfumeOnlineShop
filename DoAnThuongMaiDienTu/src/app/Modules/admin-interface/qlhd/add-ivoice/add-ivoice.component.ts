// add-ivoice.component.ts
import { Component, OnInit } from '@angular/core';
import { QlhdService } from '../qlhd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ivoice',
  templateUrl: './add-ivoice.component.html',
  styleUrls: ['./add-ivoice.component.scss'],
})
export class AddIvoiceComponent implements OnInit{
  formData: any = {};
  khList: any[] = [];
  // nhList: any[]=[];
  
  constructor(private qlhdService: QlhdService, private router: Router) {}
  ngOnInit() {
    this.loadKHList();
    // this.loadNHList();
  }
  loadKHList() {
    this.qlhdService.getAllCustomers().subscribe(
      (data) => {
        this.khList = data;
        console.log(this.khList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách khach hang', error);
      }
    );
  }

  addIvoice(): void {
    this.qlhdService.addIvoice(this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được thêm thành công');
        // Chuyển hướng người dùng trở lại trang qlhd
        this.router.navigate(['admin/qlhd']);
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm', error);
      }
    );
  }
}
