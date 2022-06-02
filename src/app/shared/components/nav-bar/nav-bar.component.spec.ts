import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTION_TYPES } from 'src/app/core/enums/action-types.enum';
import { StoreService } from 'src/app/store/store.service';
import { MouseClickDirective } from '../../directives/mouse-move.directive';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent, MouseClickDirective],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [StoreService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storeService = TestBed.inject(StoreService);

    fixture.detectChanges();
  });

  it('should route and set isLoggedIn to false on logout', fakeAsync(() => {
    const storeServiceSpy = spyOn(storeService, 'updateObs');
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.logOut();

    tick(1000);

    expect(storeServiceSpy).toHaveBeenCalled();
    expect(storeServiceSpy).toHaveBeenCalledWith(
      ACTION_TYPES.IS_LOGGED_IN,
      false
    );
    expect(routerSpy).toHaveBeenCalled();
  }));

  it('should get isLoggedIn and isUploading in ngOnInit', () => {
    const storeServiceSpy = spyOn(storeService, 'getObs');
    component.ngOnInit();

    expect(storeServiceSpy).toHaveBeenCalledTimes(2);
    expect(storeServiceSpy).toHaveBeenCalledWith(ACTION_TYPES.IS_LOGGED_IN);
    expect(storeServiceSpy).toHaveBeenCalledWith(ACTION_TYPES.IS_UPLOADING);
  });
});
