import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'angular-engie-training-edit-quantity-form',
  templateUrl: './edit-quantity-form.component.html',
  styleUrls: ['./edit-quantity-form.component.scss'],
})
export class EditQuantityFormComponent implements OnInit, OnChanges {
  @Input() cartItem!: CartItem;
  @Output() updateCartItemQuantity: EventEmitter<{
    cartItem: CartItem;
    quantity: number;
  }> = new EventEmitter();

  editItemInCartForm = new FormGroup({
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+[0-9]*$/),
    ]),
  });

  get itemFormQuantity() {
    return this.editItemInCartForm.get('quantity')?.value || 0;
  }

  set itemFormQuantity(value: number) {
    this.editItemInCartForm.get('quantity')?.setValue(value);
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.itemFormQuantity = this.cartItem.quantity;
  }

  onEditItemInCart() {
    if (!this.editItemInCartForm.valid) return;
    const newQuantity = this.editItemInCartForm.value.quantity;
    this.updateCartItemQuantity.emit({
      cartItem: this.cartItem,
      quantity: newQuantity || 0,
    });
    this.editItemInCartForm.reset();
  }
}
