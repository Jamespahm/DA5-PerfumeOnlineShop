import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  dataL: any;
  dataTH: any;
  data: any;
  currentPage: number = 1;
  itemsPerPage: number = 9;

  constructor(
    private route: ActivatedRoute,
    private dataService: ShopService,
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    // this.loadProducts();
    this.getProductsByCate();
    // this.getProductsByBrand();
    this.getLoai();
    this.getTh();
  }

  getProductsByCate() {
    this.route.paramMap.subscribe((params) => {
      const productIdd = params.get('IDTH');
      const productId = params.get('ID');
      if(productIdd== null){
        if (productId == '0') {
          this.getAllData();
        } else {
          this.dataService.getProductByCate(productId!).subscribe((data) => {
            this.data = data;
            console.log(this.data);
          });
        }
      }
      else{
        this.dataService.getProductByBrand(productIdd).subscribe((data) => {
          this.data = data;
          console.log(this.data);
        });
      }
    });
  }


  loadProducts(): void {
    this.dataService.getSP().subscribe((data) => {
      this.data = data;
    });
  }

  getLoai() {
    this.dataService.getL().subscribe((dataL) => {
      this.dataL = dataL;
    });
  }
  getTh() {
    this.dataService.getTH().subscribe((dataTH) => {
      this.dataTH = dataTH;
    });
  }

  getAllData() {
    this.dataService.getSP().subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);
    alert('Đã thêm vào giỏ hàng');
  }

  // Hàm để định dạng giá tiền với mã VND
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
