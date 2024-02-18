// edit-customer.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QlkhService } from '../qlkh.service';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})

export class EditCustomerComponent implements OnInit {
String(arg0: any) {
throw new Error('Method not implemented.');
}
  productId!: number;
  formData: any = {};
  loaiList: any[] = [];
  thList: any[]=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qlkhService: QlkhService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;
    this.loadCustomerData();
 

  }

  // loadLoaiList() {
  //   this.qlkhService.getAllLoai().subscribe(
  //     (data) => {
  //       this.loaiList = data;
  //       console.log(this.loaiList)
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy danh sách loại', error);
  //     }
  //   );
  // }
  // loadTHList() {
  //   this.qlkhService.getAllThuongHieu().subscribe(
  //     (data) => {
  //       this.thList = data;
  //       console.log(this.thList)
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy danh sách loại', error);
  //     }
  //   );
  // }

  loadCustomerData(): void {
    this.qlkhService.getCustomerById(this.productId).subscribe(
      (product) => {
        console.log('Dữ liệu sản phẩm:', product);
        this.formData = { ...product[0] };
        console.log('Dữ liệu sau khi gán vào formData:', this.formData);
      },
      (error) => {
        console.error('Lỗi khi tải thông tin sản phẩm', error);
      }
    );
  }
  updateCustomer(): void {
    this.qlkhService.updateCustomer(this.productId, this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được cập nhật thành công');
        this.router.navigate(['/admin/qlkh']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật sản phẩm', error);
      }
    );
  }
}