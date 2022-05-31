import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOGIN_STATUS } from '../core/enums/login-status.enum';
import { StoreService } from '../services/store.service';
import { TimeOutService } from '../services/time-out.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private storeService: StoreService,
    private timeOutService: TimeOutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.storeObs(LOGIN_STATUS.IS_LOGGED_IN, false);
  }

  logIn() {
    this.storeService.updateObs(LOGIN_STATUS.IS_LOGGED_IN, true);
    this.router.navigateByUrl('home');
  }

  logOut() {
    this.storeService.updateObs(LOGIN_STATUS.IS_LOGGED_IN, false);
    this.timeOutService.clearTimeoutClock();
  }
}
