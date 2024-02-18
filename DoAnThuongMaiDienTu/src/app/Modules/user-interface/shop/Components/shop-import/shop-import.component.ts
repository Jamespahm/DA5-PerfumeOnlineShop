import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopService } from '../../shop.service';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-import',
  templateUrl: './shop-import.component.html',
  styleUrls: ['./shop-import.component.scss'],
})
export class ShopImportComponent implements OnInit {
  data: any;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: ShopService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {

  }

  getAllData() {
    this.dataService.getSP().subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
  addToCart(item: any): void {
    this.cartService.addToCart(item);
    alert("Đã thêm vào giỏ hàng")

  }


}
