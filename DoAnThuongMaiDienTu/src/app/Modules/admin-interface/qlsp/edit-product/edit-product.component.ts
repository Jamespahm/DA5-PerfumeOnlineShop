// edit-product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QlspService } from '../qlsp.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})

export class EditProductComponent implements OnInit {
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
    private qlspService: QlspService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;
    this.loadProductData();
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

  loadProductData(): void {
    this.qlspService.getProductById(this.productId).subscribe(
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
  updateProduct(): void {
    this.qlspService.updateProduct(this.productId, this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được cập nhật thành công');
        this.router.navigate(['/admin/qlsp']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật sản phẩm', error);
      }
    );
  }
}