import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from 'src/app/auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule],
  exports: [AuthComponent],
  providers: [],
})
export class AuthModule {}
