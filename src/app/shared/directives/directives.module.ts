import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseMoveDirective } from './mouse-move.directive';

@NgModule({
  declarations: [MouseMoveDirective],
  imports: [CommonModule],
  exports: [MouseMoveDirective],
  providers: [],
})
export class DirectivesModule {}
