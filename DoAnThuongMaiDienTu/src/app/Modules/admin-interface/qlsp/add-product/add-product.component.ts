// add-product.component.ts
import { Component, OnInit } from '@angular/core';
import { QlspService } from '../qlsp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit{
  formData: any = {};
  loaiList: any[] = [];
  thList: any[]=[];
  
  constructor(private qlspService: QlspService, private router: Router) {}
  ngOnInit() {
    this.loadLoaiList();
    this.loadTHList();
  }
  loadLoaiList() {
    this.qlspService.getAllLoai().subscribe(
      (data) => {
        this.loaiList = data;
        console.log(this.loaiList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }
  loadTHList() {
    this.qlspService.getAllThuongHieu().subscribe(
      (data) => {
        this.thList = data;
        console.log(this.thList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }

  addProduct(): void {
    this.qlspService.addProduct(this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được thêm thành công');
        // Chuyển hướng người dùng trở lại trang qlsp
        this.router.navigate(['admin/qlsp']);
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm', error);
      }
    );
  }
}
