import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from '../store/store.service';

import { TimeOutService } from './time-out.service';

describe('TimeOutService', () => {
  let service: TimeOutService;
  let storeServiceSpy: StoreService;
  let routerDouble: Router;

  beforeEach(() => {
    let storeServiceSpyOriginal: jasmine.SpyObj<StoreService> =
      jasmine.createSpyObj('storeServiceSpy', {
        storeObs: () => {},
        updateObs: () => {},
      });

    TestBed.configureTestingModule({
      providers: [{ provide: StoreService, useValue: storeServiceSpyOriginal }],
      imports: [RouterTestingModule.withRoutes([])],
    });

    service = TestBed.inject(TimeOutService);
    storeServiceSpy = TestBed.inject(StoreService);
    routerDouble = TestBed.inject(Router);
  });

  it('should update isLoggedIn after timeOut', fakeAsync(() => {
    service.setTimeOutClock();

    tick(10000);

    expect(storeServiceSpy.updateObs).toHaveBeenCalled();
  }));

  it('should call navigateByUrl after timeOut', fakeAsync(() => {
    const routerSpy = spyOn(routerDouble, 'navigateByUrl');
    service.setTimeOutClock();

    tick(10000);

    expect(routerSpy).toHaveBeenCalled();
  }));

  it('should route user to auth after timeOut', fakeAsync(() => {
    const routerSpy = spyOn(routerDouble, 'navigateByUrl');
    service.setTimeOutClock();

    tick(10000);

    expect(routerSpy).toHaveBeenCalledWith('/');
  }));

  it('should populate currentClock when setTimeOutClock is called', () => {
    service.setTimeOutClock();

    expect(service.currentClock).toBeTruthy();
    expect(service.currentClock).not.toEqual(null);
    expect(service.currentClock).not.toEqual(undefined);
  });

  it('should clear currentClock when setTimeOutClock is called', () => {
    service.clearTimeoutClock();
    expect(service.currentClock).toBeFalsy();
    expect(service.currentClock).toEqual(undefined);
  });
});
