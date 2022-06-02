import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTION_TYPES } from '../core/enums/action-types.enum';
import { TimeOutService } from '../services/time-out.service';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { StoreService } from '../store/store.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let timeOutService: TimeOutService;
  let storeServiceSpy: StoreService;

  beforeEach(async () => {
    let storeServiceSpyOriginal: jasmine.SpyObj<StoreService> =
      jasmine.createSpyObj('storeServiceSpy', {
        storeObs: () => {},
        getObs: {
          pipe() {},
        },
        updateObs: () => {},
      });

    let timeOutServiceSpyOriginal: jasmine.SpyObj<TimeOutService> =
      jasmine.createSpyObj('timeOutService', {
        setTimeOutClock: () => {},
        clearTimeoutClock: () => {},
      });

    await TestBed.configureTestingModule({
      declarations: [AuthComponent, NavBarComponent],
      providers: [
        { provide: StoreService, useValue: storeServiceSpyOriginal },
        { provide: TimeOutService, useValue: timeOutServiceSpyOriginal },
      ],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    timeOutService = TestBed.inject(TimeOutService);
    storeServiceSpy = TestBed.inject(StoreService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should initialize values', () => {
    const spyInitializeValues = spyOn(component, 'initializeValues');
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(spyInitializeValues).toHaveBeenCalled();
  });

  it('should set isLoggedIn to true', () => {
    component.logIn();

    expect(storeServiceSpy.updateObs).toHaveBeenCalledWith(
      ACTION_TYPES.IS_LOGGED_IN,
      true
    );
  });

  it('should set isLoggedIn to false', () => {
    component.logOut();

    expect(storeServiceSpy.updateObs).toHaveBeenCalledWith(
      ACTION_TYPES.IS_LOGGED_IN,
      false
    );
  });

  it('should clear clock', () => {
    component.logOut();
    expect(timeOutService.clearTimeoutClock).toHaveBeenCalled();
  });
});
