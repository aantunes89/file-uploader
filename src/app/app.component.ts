import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store/store.service';
import { ClockStatus } from 'src/app/core/enums/clock-status.enum';
import { LOGIN_STATUS } from 'src/app/core/enums/login-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public interval: any;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    // apagar
    this.storeService.storeObs(ClockStatus.START_CLOCK, false);
    // this.initializeClock();

    // this.setupIsLoggedInSubscription();
  }

  // apagar
  initializeClock(): void {
    this.storeService
      .getObs(ClockStatus.START_CLOCK)
      .pipe(
        tap(console.log),
        filter((isOn: boolean) => {
          clearInterval(this.interval);
          return isOn === true;
        }),
        tap(() => {
          let counter = 0;
          this.interval = setInterval(() => {
            counter = counter + 1;
            console.log(counter);
          }, 1000);
        })
      )
      .subscribe();
  }
}
