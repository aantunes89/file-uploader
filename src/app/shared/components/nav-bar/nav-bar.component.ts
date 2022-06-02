import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ACTION_TYPES } from 'src/app/core/enums/action-types.enum';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public isUploading$: Observable<boolean>;
  public vm$: Observable<boolean>;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.storeService.getObs(ACTION_TYPES.IS_LOGGED_IN);
    this.isUploading$ = this.storeService.getObs(ACTION_TYPES.IS_UPLOADING);

    this.vm$ = combineLatest([this.isLoggedIn$, this.isUploading$]).pipe(
      map(([isLoggedIn, isUploading]) => {
        return isLoggedIn && !isUploading ? true : false;
      })
    );
  }

  public async logOut(): Promise<void> {
    await this.router.navigateByUrl('/');
    this.storeService.updateObs(ACTION_TYPES.IS_LOGGED_IN, false);
  }
}
