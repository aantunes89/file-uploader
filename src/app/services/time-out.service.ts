import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { ACTION_TYPES } from '../core/enums/action-types.enum';

@Injectable({
  providedIn: 'root',
})
export class TimeOutService {
  currentClock;

  constructor(private storeService: StoreService, private router: Router) {}

  setTimeOutClock() {
    this.currentClock = setTimeout(() => {
      this.storeService.updateObs(ACTION_TYPES.IS_LOGGED_IN, false);
      this.router.navigateByUrl('/');
    }, 9900);
  }

  clearTimeoutClock() {
    window.clearTimeout(this.currentClock);
  }
}
