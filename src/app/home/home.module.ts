import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';

import { FileItemComponent } from 'src/app/home/components/file-item/file-item.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

const routes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, FileItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DirectivesModule],
  exports: [HomeComponent, FileItemComponent],
})
export class HomeModule {}
