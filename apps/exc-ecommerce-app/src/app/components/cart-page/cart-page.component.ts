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
    const oldCartItem = event.cartItem;
    const oldQuantityCartItem = oldCartItem.quantity;
    const newQuantityCartItem = event.quantity;
    if (oldQuantityCartItem === newQuantityCartItem) return;
    
    // this call is Unessecary if I was developing a my own backend as well...
    this.itemService.getItem(oldCartItem.itemId).subscribe({
      next: (oldCatalogItem) => {

        if (newQuantityCartItem > oldCatalogItem.quantity) {
          alert('The quantity is bigger than the available');
          return;
        }

        const newQuantityCatalogItem =
          oldCatalogItem.quantity + oldQuantityCartItem - newQuantityCartItem;
        const newCatalogItem = {
          ...oldCatalogItem,
          quantity: newQuantityCatalogItem,
        };

        if (newQuantityCartItem === 0) {
          this.toDeleteCartItem(oldCartItem, newCatalogItem);
        } else if (newQuantityCartItem > 0) {
          this.toUpdateCartItem(oldCartItem, newQuantityCartItem, newCatalogItem);
        }
      },
      error: console.error,
    });
  }

  toDeleteCartItem(cartItem: CartItem, catalogItem: Item): void {
    this.cartService.deleteCartItem(cartItem.id).subscribe({
      next: () =>
        this.toUpdateCatalogItem(cartItem.itemId, catalogItem),
      error: console.error,
    });
  }

  toUpdateCartItem(cartItem: CartItem, newQuantityCartItem: number, catalogItem: Item): void {
    this.cartService
    .updateCartItem(cartItem.id, {
      ...cartItem,
      quantity: newQuantityCartItem,
    })
    .subscribe({
      next: () =>
        this.toUpdateCatalogItem(cartItem.itemId, catalogItem),
      error: console.error,
    });
  }

  toUpdateCatalogItem(id: string, catalogItem: Item): void {
    this.itemService.updateItem(id, catalogItem).subscribe({
      next: () => this.cartService.refreshCart(),
      error: console.error,
    });
  }
}
