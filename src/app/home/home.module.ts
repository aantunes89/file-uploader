import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { FileItemComponent } from './components/file-item/file-item.component';
import { MouseMoveDirective } from '../shared/directives/mouse-move.directive';

const routes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, FileItemComponent, MouseMoveDirective],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
})
export class HomeModule {}
