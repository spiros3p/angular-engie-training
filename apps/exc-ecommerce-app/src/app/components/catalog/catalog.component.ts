import { Component, OnInit } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';
import { Item } from '../../models/item.model';
import { CartService } from '../../services/cart.service';
import { ItemsService } from '../../services/items.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'angular-engie-training-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  itemsList: Array<Item> = [];
  itemsFetched = false;
  breakpoint!: number;
  user!: string;
  cart!: Array<CartItem>;

  constructor(
    private itemService: ItemsService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.itemService
      .onAddItemToCatalog()
      .subscribe((item) => this.itemsList.push(item));
    this.userService.onSetUser().subscribe((user) => (this.user = user));
    this.cartService.onUpdateCart().subscribe((cart) => (this.cart = cart));
  }

  ngOnInit(): void {
    this.onResize('');
    this.userService.fetchUser();
    this.cartService.refreshCart();
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.itemsList = items;
        this.itemsFetched = true;
      },
      error: console.error,
    });
  }

  onSubmitItemToCart(event: { item: Item; quantity: number }) {
    if (!this.user) return alert('no user found');
    const cartItem = this.existsInCart(event.item);
    // ofc fetch info first from server before updating it
    this.itemService
      .updateItem(event.item.id, {
        ...event.item,
        quantity: event.item.quantity - event.quantity,
      })
      .subscribe({
        next: (res) => {
          this.refreshCatalogView(res);
          if (cartItem) {
            const updatedCartItem = {
              ...cartItem,
              quantity: cartItem.quantity + event.quantity,
            };
            this.cartService
              .updateCartItem(updatedCartItem.id, updatedCartItem)
              .subscribe({
                next: (res) => {
                  this.cartService.refreshCart();
                },
                error: console.error,
              });
          } else {
            const newCartItem = this.mapItemToNewCartItem(
              event.item,
              event.quantity
            );
            this.cartService.postCartItem(newCartItem).subscribe({
              next: (res) => {
                this.cartService.refreshCart();
              },
              error: console.error,
            });
          }
        },
        error: console.error,
      });
  }

  onDeleteItem(item: Item) {
    this.itemService.deleteItem(item.id).subscribe({
      next: () => {
        this.itemsList = this.itemsList.filter((t) => t.id !== item.id);
        setTimeout(() => alert(`Item ${item.name} deleted succesfully!`), 50);
      },
      error: console.error,
    });
  }

  onUpdateItem(item: Item) {
    this.itemService.updateItem(item.id, item).subscribe({
      next: (res) => {
        this.refreshCatalogView(res);
      },
      error: console.error,
    });
  }

  // Manual because NOT bootstrap ;P
  onResize(event: any) {
    // (window:resize)="onResize($event)"
    if (window.innerWidth <= 550) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 850) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }

  refreshCatalogView(res: Item) {
    this.itemsList = this.itemsList.map((t) => {
      return t.id === res.id ? res : t;
    });
  }

  existsInCart(catalogItem: Item) {
    return this.cart.find(
      (cartItem) =>
        cartItem.itemId === catalogItem.id &&
        cartItem.user === this.user.toLowerCase()
    );
  }

  mapItemToNewCartItem(item: Item, quantity: number): Omit<CartItem, 'id'> {
    return {
      itemId: item.id,
      user: this.user.toLowerCase(),
      name: item.name,
      description: item.description,
      quantity: quantity,
      pictureUrl: item.pictureUrl,
      price: item.price,
    };
  }
}
