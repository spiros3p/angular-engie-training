import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'angular-engie-training-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() user!: string;
  cart!: CartItem[];

  constructor(private cartService: CartService) {
    this.cartService.onUpdateCart().subscribe((cart) => (this.cart = cart));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cartService.refreshCart();
  }

  get cartTotalPrice() {
    let totalPrice = 0;
    if (this.cart) {
      this.cart.map((cartItem) => {
        totalPrice = totalPrice + cartItem.price * cartItem.quantity;
      });
    }
    return totalPrice;
  }

  get totalQuantity() {
    let total = 0;
    if (this.cart) {
      this.cart.map((cartItem) => {
        total = total + cartItem.quantity;
      });
    }
    return total;
  }
}
