import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ItemFormModalComponent } from '../components/item-form-modal/item-form-modal.component';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class OpenModalService {
  constructor(public dialog: MatDialog) {}

  openDialog(data?: Partial<Item>): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      name: data?.name,
      quantity: data?.quantity,
      pictureUrl: data?.pictureUrl,
      price: data?.price,
      description: data?.description,
    };

    const dialogRef = this.dialog.open(ItemFormModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      // let itemToCreate = {};
    });
  }
}
