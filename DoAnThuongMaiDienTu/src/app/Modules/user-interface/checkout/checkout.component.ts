// checkout.component.ts
import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../toast.service';
import { QlhdService } from '../../admin-interface/qlhd/qlhd.service';
import { QlcthdService } from '../../admin-interface/qlcthd/qlcthd.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  userId!: string;
  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') ?? '';
    } else {
      console.error('Không tìm thấy userId trong localStorage');
      this.router.navigate(['/user/login']); // Thay thế '/login' bằng đường dẫn trang đăng nhập
    }
    this.getcart();
    // this.payment();
    console.log('id : ' + this.userId);
  }
  cartItems: any[] = [];
  sum = 0;
  sl = 0;
  HDnew: any;
  formData = {
    SDT: '',
    DiaChi: '',
    ThanhToan: '',
  };
  constructor(
    private cart: ShoppingCartService,
    private http: HttpClient,
    private datePiPe: DatePipe,
    private toasmsg: ToastService,
    private router: Router,
    private qlhdService: QlhdService,
    private qlcthdService: QlcthdService
  ) {}

  getcart() {
    this.cartItems = this.cart.getCartItems();
    console.log(this.cartItems);
    this.sl = this.cartItems.reduce((sl, value) => (sl += value.quantity), 0);
    this.sum = this.cartItems.reduce(
      (sum, value) => (sum += value.quantity * value.GiaBan),
      0
    );
    console.log('sl : ' + this.sl);
    console.log('tt : ' + this.sum);
  }

  payment() {
    let infHD = {
      MaKH: this.userId,
      NgayDat: '2023/01/10',
      SoLuong: this.sl,
      TongTien: this.sum,
      TrangThai: 'chờ xác nhận',
      SDT: this.formData.SDT,
      DiaChi: this.formData.DiaChi,
      ThanhToan: this.formData.ThanhToan,
    };

    this.qlhdService.addIvoice(infHD).subscribe(
      (response: any) => {

        this.qlhdService.getIvoiceLatest().subscribe(
          (response: any) => {
            this.HDnew = response;
            console.log(this.HDnew[0]);

            this.cartItems.forEach((value) => {
              let infoCTHD = {
                MaHD: this.HDnew[0].ID,
                MaNH: value.ID,
                hinhAnh: value.HinhAnh,
                soLuong: value.quantity,
                giaBan: value.GiaBan,
                tongTien: value.quantity * value.GiaBan,
              };
              console.log(infoCTHD); // Kiểm tra giá trị của infoCTHD

              this.qlcthdService.addIvoiceDetail(infoCTHD).subscribe(
                (response: any) => {
                  if (response) {
                    console.log('thanh cong');
                    this.cart.clearCart();
                    this.getcart();
                    this.toasmsg.showToast({
                      title: 'Thành công',
                      message: 'Thanh toán sản phẩm thành công',
                      type: 'success',
                    });
                    // alert("Thanh toán thành công");
                    this.router.navigate(['/user/shop/0']);
                  }
                },
                (error) => {
                  console.error(error);
                }
              );
            });
          },
          (error) => {
            console.error(error);
          }
        );
 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
