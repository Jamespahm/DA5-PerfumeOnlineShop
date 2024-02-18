import { Component, OnInit } from '@angular/core';
import { ShopDetailsService } from '../../shop-details.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { QlhdService } from '../../../../admin-interface/qlhd/qlhd.service';  // Hãy thay đường dẫn đến QlhdService thực tế của bạn

@Component({
  selector: 'app-shope-details',
  templateUrl: './shope-details.component.html',
  styleUrls: ['./shope-details.component.scss'],
})
export class ShopeDetailsComponent implements OnInit {
  product: any;
  dproduct: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ShopDetailsService,
    private cartService: ShoppingCartService,
    private qlhdService: QlhdService, 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('ID');
      this.productService.getProductById(productId!).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    });

    this.route.paramMap.subscribe((params) => {
      const dProductId = params.get('ID');
      this.productService
        .getDetailProductById(dProductId!)
        .subscribe((data) => {
          this.dproduct = data;
          console.log(this.dproduct);
        });
    });
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);
    // alert("Đã thêm vào giỏ hàng")
  }
  checkoutsp(products: any[]): void {
    // Tạo một đối tượng đại diện cho hóa đơn
    const invoiceData = {
      // Các trường thông tin hóa đơn, ví dụ: MaKH, NgayDat, ...
    };

    // Thêm hóa đơn vào CSDL thông qua QlhdService
    this.qlhdService.addIvoice(invoiceData).subscribe(
      (result) => {
        console.log('Hóa đơn đã được tạo thành công:', result);

        // Lấy ID của hóa đơn vừa được tạo
        const invoiceId = result.id; // (Hãy thay đổi tên trường ID tùy theo API của bạn)

        // Tạo một mảng các chi tiết hóa đơn
        const invoiceDetails = products.map(product => ({
          MaHD: invoiceId,
          MaNH: product.ID,
          SoLuong: product.quantity,
          // Các trường thông tin khác của chi tiết hóa đơn
        }));
        
      },
      (error) => {
        console.error('Lỗi khi tạo hóa đơn', error);
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
