import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, DirectivesModule, RouterModule],
  exports: [NavBarComponent],
  providers: [],
})
export class NavBarModule {}
