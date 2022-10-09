import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReplaceDescriptionPipe } from './replace-description.pipe';
import { ReplaceTitlePipe } from './replace-title.pipe';
import { UnitPipe } from './unit.pipe';

@NgModule({
  declarations: [UnitPipe, ReplaceDescriptionPipe, ReplaceTitlePipe],
  imports: [CommonModule],
  exports: [UnitPipe, ReplaceDescriptionPipe, ReplaceTitlePipe],
})
export class PipesModule {}
