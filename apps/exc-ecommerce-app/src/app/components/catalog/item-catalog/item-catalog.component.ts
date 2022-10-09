import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Item } from '../../../models/item.model';
import { ItemsService } from '../../../services/items.service';
import { ItemFormModalComponent } from '../../item-form-modal/item-form-modal.component';

const EMPTY_PICTURE_URL =
  'https://www.pngkey.com/png/full/187-1870064_black-question-mark-emoji-question-mark-icon-grey.png';

@Component({
  selector: 'angular-engie-training-item-catalog',
  templateUrl: './item-catalog.component.html',
  styleUrls: ['./item-catalog.component.scss'],
})
export class ItemCatalogComponent implements OnInit {
  @Input() item!: Item;
  @Output() deleteItem: EventEmitter<Item> = new EventEmitter();
  @Output() updateItem: EventEmitter<Item> = new EventEmitter();
  @Output() submitItemToCart: EventEmitter<{ item: Item; quantity: number }> =
    new EventEmitter();

  addItemToCartForm = new FormGroup({
    quantity: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+[0-9]*$/),
      this.ValidateNoZero,
    ]),
  });

  constructor(public dialog: MatDialog, private itemService: ItemsService) {}

  get emptyPictureUrl() {
    return EMPTY_PICTURE_URL;
  }

  ngOnInit(): void {}

  onSubmitItemToCart(item: Item) {
    if (!this.addItemToCartForm.valid) return;
    if (
      this.addItemToCartForm.value.quantity &&
      this.addItemToCartForm.value.quantity > this.item.quantity
    ) {
      alert('Try smaller quantity');
      return;
    }
    this.addItemToCartForm.value.quantity &&
      this.submitItemToCart.emit({
        item: item,
        quantity: this.addItemToCartForm.value.quantity,
      });
    this.addItemToCartForm.reset();
  }

  onDelete(item: Item) {
    this.deleteItem.emit(item);
  }

  onUpdate(item: Item) {
    this.updateItem.emit(item);
  }

  openDialog(data?: Partial<Item>): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '0',
      left: '0',
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ItemFormModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      result = {
        id: data?.id,
        dateAdded: data?.dateAdded,
        dateUpdated: new Date().toISOString(),
        ...result,
      };
      this.onUpdate(result);
    });
  }

  ValidateNoZero(control: AbstractControl) {
    if (control.value == 0) {
      return { invalidQuantity: true };
    }
    return null;
  }
}
