import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_STATUS } from 'src/app/core/enums/login-status.enum';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.storeService.getObs(LOGIN_STATUS.IS_LOGGED_IN);
  }

  public async logOut(): Promise<void> {
    await this.router.navigateByUrl('/');
    this.storeService.updateObs(LOGIN_STATUS.IS_LOGGED_IN, false);
  }
}
