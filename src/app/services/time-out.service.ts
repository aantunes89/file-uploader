import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_STATUS } from 'src/app/core/enums/login-status.enum';
import { StoreService } from 'src/app/store/store.service';

@Injectable({
  providedIn: 'root',
})
export class TimeOutService {
  currentClock;

  constructor(private storeService: StoreService, private router: Router) {}

  setTimeOutClock() {
    this.currentClock = setTimeout(() => {
      this.storeService.updateObs(LOGIN_STATUS.IS_LOGGED_IN, false);
      this.router.navigateByUrl('/');
    }, 9900);
  }

  clearTimeoutClock() {
    window.clearTimeout(this.currentClock);
  }
}
