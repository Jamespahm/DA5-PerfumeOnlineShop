//shopping-cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QlkhService } from '../../admin-interface/qlkh/qlkh.service';
import { QlhdService } from '../../admin-interface/qlhd/qlhd.service';
// import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private storageKey = 'cartItems';
  cartItems: any[] = [];

  constructor(private http: HttpClient) {
    this.getCart();
  }

  getCart(): void {
    const storedItems = localStorage.getItem(this.storageKey);
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    console.log(this.cartItems)
  }
  
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Phương thức mới để lấy danh sách sản phẩm trong giỏ hàng
  getCartItemsList(): Observable<any[]> {
    // Bạn có thể trả về danh sách sản phẩm trong giỏ hàng như là một Observable
    return new Observable((observer) => {
      observer.next(this.cartItems);
      observer.complete();
    });
  }
  addToCart(item: any): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.ID === item.ID
    );

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      existingItem.quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
      item.quantity = 1;
      this.cartItems.push(item);
    }

    this.saveToStorage();
  }

  increaseQuantity(item: any): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.ID === item.ID
    );
    if (existingItem) {
      existingItem.quantity += 1;
      this.saveToStorage();
    }
  }

  decreaseQuantity(item: any): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.ID === item.ID
    );
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      this.saveToStorage();
    }
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.GiaBan * item.quantity,
      0
    );
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveToStorage();
    }
  }


  clearCart(): void {
    this.cartItems = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }
  // Thêm method để đặt hàng
  private apiHD = 'http://localhost:3200/hoadon';

  placeOrder(orderData: any): Observable<any> {
    const url = `${this.apiHD}/add-order`;
    return this.http.post<any>(url, orderData);
  }
}
