import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CartItem } from '../models/cart-item.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:5000';
  private subject = new Subject<CartItem[]>();

  cart: Array<CartItem> = [];
  user!: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.onSetUser().subscribe((user) => (this.user = user));
  }

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUserCartItems(userId: string): Observable<CartItem[]> {
    const url = `${this.url}/shopping-cart?user=${userId.toLowerCase()}`;
    return this.http.get<CartItem[]>(url, this.httpOptions);
  }

  updateCartItem(id: string, data: CartItem): Observable<CartItem> {
    const url = `${this.url}/shopping-cart/${id}`;
    return this.http.put<CartItem>(url, data, this.httpOptions);
  }

  deleteCartItem(id: string): Observable<CartItem> {
    const url = `${this.url}/shopping-cart/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  postCartItem(data: Omit<CartItem, 'id'>): Observable<CartItem> {
    const url = `${this.url}/shopping-cart`;
    return this.http.post<CartItem>(url, data, this.httpOptions);
  }

  updateCart(cart: CartItem[]): void {
    this.subject.next(cart);
  }

  onUpdateCart(): Observable<CartItem[]> {
    return this.subject.asObservable();
  }

  refreshCart(): void {
    if (this.user) {
      this.getUserCartItems(this.user).subscribe((cart) =>
        this.updateCart(cart)
      );
    } else {
      this.updateCart([]);
    }
  }
}
