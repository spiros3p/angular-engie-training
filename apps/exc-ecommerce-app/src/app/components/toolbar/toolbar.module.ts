import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material/material.module';
import { ItemFormModalComponent } from '../item-form-modal/item-form-modal.component';
import { CartComponent } from './cart/cart.component';
import { ToolbarComponent } from './toolbar.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ItemFormModalComponent,
    UserComponent,
    CartComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [ToolbarComponent, ItemFormModalComponent],
})
export class ToolbarModule {}
