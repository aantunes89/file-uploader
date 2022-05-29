import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { MouseActiveDirective } from './shared/directives/mouse-active.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    MouseActiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
