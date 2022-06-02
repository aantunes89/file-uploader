import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseClickDirective } from './mouse-move.directive';

@NgModule({
  declarations: [MouseClickDirective],
  imports: [CommonModule],
  exports: [MouseClickDirective],
  providers: [],
})
export class DirectivesModule {}
