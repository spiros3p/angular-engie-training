import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Item } from '../../models/item.model';

@Component({
  selector: 'angular-engie-training-item-form-modal',
  templateUrl: './item-form-modal.component.html',
  styleUrls: ['./item-form-modal.component.scss'],
})
export class ItemFormModalComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(this.data?.name, [Validators.required]),
    description: new FormControl(this.data?.description),
    quantity: new FormControl(this.data?.quantity, [
      Validators.required,
      Validators.pattern(/^\d+$/), // only numbers
    ]),
    pictureUrl: new FormControl(this.data?.pictureUrl),
    price: new FormControl(this.data?.price, [
      Validators.required,
      Validators.pattern(/^\d+$/), // only numbers
    ]),
  });
  windowSize!: string;

  constructor(
    private dialogRef: MatDialogRef<ItemFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Item>
  ) {}

  ngOnInit(): void {
    this.onResize('');
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      return;
    }
    alert('error');
  }

  close() {
    this.dialogRef.close();
  }

    // Manual because NOT bootstrap ;P
    onResize(event: any) {
      // (window:resize)="onResize($event)"
      // if (window.innerWidth <= 550) {
      //   this.windowSize = 'sm';
      // } else
       if (window.innerWidth <= 1148) {
        this.windowSize = 'md';
      } else {
        this.windowSize = 'lg';
      }
    }
}
