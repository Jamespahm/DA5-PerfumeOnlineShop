
//shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: ShoppingCartService, router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.cartItems = this.cartService.getCartItems();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  getTotalAmount(): number {
    return this.cartService.getTotalAmount();
  }

  // Hàm để định dạng giá tiền với mã VND
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

}
