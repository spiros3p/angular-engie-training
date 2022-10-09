import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Item } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { UserService } from '../../services/user.service';
import { ItemFormModalComponent } from '../item-form-modal/item-form-modal.component';

@Component({
  selector: 'angular-engie-training-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  user!: string;

  constructor(
    public dialog: MatDialog,
    private itemService: ItemsService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.onSetUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  get isCatalogRoute() {
    return this.router.url === '/';
  }

  openDialog(data?: Partial<Item>): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '0',
      left: '0',
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: data?.name,
      quantity: data?.quantity,
      pictureUrl: data?.pictureUrl,
      price: data?.price,
      description: data?.description,
    };

    const dialogRef = this.dialog.open(ItemFormModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      result = {
        dateUpdated: '',
        dateAdded: new Date().toISOString(),
        ...result,
      };

      this.itemService.postItem(result).subscribe({
        next: (res) => {
          this.itemService.addItemToCatalog(res);
        },
        error: console.error,
      });
    });
  }
}
