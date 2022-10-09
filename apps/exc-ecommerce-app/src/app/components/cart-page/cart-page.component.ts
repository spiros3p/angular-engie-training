import { Component, OnInit } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';
import { Item } from '../../models/item.model';
import { CartService } from '../../services/cart.service';
import { ItemsService } from '../../services/items.service';

const EMPTY_PICTURE_URL =
  'https://www.pngkey.com/png/full/187-1870064_black-question-mark-emoji-question-mark-icon-grey.png';

@Component({
  selector: 'angular-engie-training-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cart: Array<CartItem> = [];
  displayedColumns = [
    'pictureUrl',
    'name',
    'description',
    'quantity',
    'price',
    'actions',
  ];
  get emptyPictureUrl() {
    return EMPTY_PICTURE_URL;
  }

  constructor(
    private cartService: CartService,
    private itemService: ItemsService
  ) {
    this.cartService.onUpdateCart().subscribe((cart) => (this.cart = cart));
  }

  ngOnInit(): void {
    this.cartService.refreshCart();
  }

  onDelete(cartItem: CartItem) {
    this.onUpdateCartItemQuantity({ cartItem: cartItem, quantity: 0 });
  }

  onUpdateCartItemQuantity(event: { cartItem: CartItem; quantity: number }) {
    if (event.quantity === event.cartItem.quantity) return;

    this.itemService.getItem(event.cartItem.itemId).subscribe({
      next: (item) => {
        let catalogItem = item;

        if (event.quantity > item.quantity) {
          alert('The quantity is bigger than the available');
          return;
        }

        const quantityDifference = event.cartItem.quantity - event.quantity;
        catalogItem = {
          ...catalogItem,
          quantity: catalogItem.quantity + quantityDifference,
        };

        if (event.quantity === 0) {
          this.cartService.deleteCartItem(event.cartItem.id).subscribe({
            next: () => this.updateCatalog(event.cartItem.itemId, catalogItem),
            error: console.error,
          });
        } else {
          this.cartService
            .updateCartItem(event.cartItem.id, {
              ...event.cartItem,
              quantity: event.quantity,
            })
            .subscribe({
              next: () =>
                this.updateCatalog(event.cartItem.itemId, catalogItem),
              error: console.error,
            });
        }
      },
      error: console.error,
    });
  }

  updateCatalog(id: string, catalogItem: Item): void {
    this.itemService.updateItem(id, catalogItem).subscribe({
      next: () => this.cartService.refreshCart(),
      error: console.error,
    });
  }
}
