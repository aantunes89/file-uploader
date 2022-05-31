import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_STATUS } from '../core/enums/login-status.enum';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class TimeOutService {
  private currentClock;

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
