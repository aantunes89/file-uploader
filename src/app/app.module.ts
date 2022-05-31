import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AuthComponent } from './auth/auth.component';
import { StartupService } from './services/startup.service';

export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.initializeApp();
}

@NgModule({
  declarations: [AppComponent, NavBarComponent, AuthComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
