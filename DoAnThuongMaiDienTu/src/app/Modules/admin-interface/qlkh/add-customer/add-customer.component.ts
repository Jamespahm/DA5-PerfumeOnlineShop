// add-customer.component.ts
import { Component, OnInit } from '@angular/core';
import { QlkhService } from '../qlkh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit{
  formData: any = {};
  loaiList: any[] = [];
  thList: any[]=[];
  
  constructor(private qlkhService: QlkhService, private router: Router) {}
  ngOnInit() {

  }
  
  addCustomer(): void {
    this.qlkhService.addCustomer(this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được thêm thành công');
        // Chuyển hướng người dùng trở lại trang qlkh
        this.router.navigate(['admin/qlkh']);
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm', error);
      }
    );
  }
}
