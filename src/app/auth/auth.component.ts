import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { TimeOutService } from 'src/app/services/time-out.service';
import { filter, tap } from 'rxjs/operators';
import { ACTION_TYPES } from '../core/enums/action-types.enum';

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
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.storeService.getObs(ACTION_TYPES.IS_LOGGED_IN).pipe(
      filter((isLoggedIn: boolean) => isLoggedIn === true),
      tap(() => {
        this.router.navigateByUrl('home');
      })
    );
  }

  public logIn(): void {
    this.storeService.updateObs(ACTION_TYPES.IS_LOGGED_IN, true);
  }

  logOut() {
    this.storeService.updateObs(ACTION_TYPES.IS_LOGGED_IN, false);
    this.timeOutService.clearTimeoutClock();
  }
}
