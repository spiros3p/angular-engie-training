import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { CartPageComponent } from './cart-page.component';
import { EditQuantityFormComponent } from './edit-quantity-form/edit-quantity-form.component';

@NgModule({
  declarations: [CartPageComponent, EditQuantityFormComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [CartPageComponent],
})
export class CartPageModule {}
