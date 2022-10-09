import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../../directives/directives.module';
import { MaterialModule } from '../../material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CatalogComponent } from './catalog.component';
import { ItemCatalogComponent } from './item-catalog/item-catalog.component';

@NgModule({
  declarations: [CatalogComponent, ItemCatalogComponent],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  exports: [CatalogComponent],
})
export class CatalogModule {}
