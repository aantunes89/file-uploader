import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { ACTION_TYPES } from '../core/enums/action-types.enum';
import { TimeOutService } from '../services/time-out.service';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { MouseClickDirective } from '../shared/directives/mouse-move.directive';
import { StoreService } from '../store/store.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let timeOutService: TimeOutService;
  let storeServiceSpy: StoreService;

  beforeEach(async () => {
    let timeOutServiceSpyOriginal: jasmine.SpyObj<StoreService> =
      jasmine.createSpyObj('timeOutService', {
        setTimeOutClock: () => {},
        clearTimeoutClock: () => {},
      });

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MouseClickDirective, NavBarComponent],
      providers: [
        StoreService,
        { provide: TimeOutService, useValue: timeOutServiceSpyOriginal },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    timeOutService = TestBed.inject(TimeOutService);
    storeServiceSpy = TestBed.inject(StoreService);
    storeServiceSpy.storeObs(ACTION_TYPES.IS_LOGGED_IN, true);

    fixture.detectChanges();
  });

  it('should start clock onInit', () => {
    component.ngOnInit();

    expect(timeOutService.setTimeOutClock).toHaveBeenCalled();
  });

  it('should initialize values onInit', () => {
    const initializeValuesSpy = spyOn(component, 'initializeValues');
    component.ngOnInit();

    expect(initializeValuesSpy).toHaveBeenCalled();
  });

  it('should set isLoggedIn to true', () => {
    const updateOBsSpy = spyOn(storeServiceSpy, 'updateObs');
    component.ngOnInit();

    expect(updateOBsSpy).toHaveBeenCalled();
    expect(updateOBsSpy).toHaveBeenCalledWith(ACTION_TYPES.IS_LOGGED_IN, true);
  });

  it('should clear clock on upload file', () => {
    component.uploadFile();

    expect(timeOutService.setTimeOutClock).toHaveBeenCalled();
  });

  it('should set isUploading to true on upload files', () => {
    const updateOBsSpy = spyOn(storeServiceSpy, 'updateObs');

    component.uploadFile();

    expect(updateOBsSpy).toHaveBeenCalled();
    expect(updateOBsSpy).toHaveBeenCalledWith(ACTION_TYPES.IS_UPLOADING, true);
  });

  describe('upload file async calls', () => {
    beforeEach(() => {
      component.filesCopy = [
        ...JSON.parse(localStorage.getItem(ACTION_TYPES.FILES)),
      ];
    });

    it('should call saveFile after timeout', fakeAsync(() => {
      const saveFileSpy = spyOn(component, 'saveFile');

      component.uploadFile();

      tick(20001);

      expect(saveFileSpy).toHaveBeenCalled();
    }));

    it('should start clock after timeout', fakeAsync(() => {
      component.uploadFile();

      tick(20001);

      expect(timeOutService.setTimeOutClock).toHaveBeenCalled();
    }));

    it('should update files when saveFile is called', () => {
      const updateOBsSpy = spyOn(storeServiceSpy, 'updateObs');
      const file = { title: 'Title1', size: 10 };

      component.saveFile(file);

      expect(updateOBsSpy).toHaveBeenCalled();
      expect(updateOBsSpy).toHaveBeenCalledOnceWith(ACTION_TYPES.FILES, [
        ...component.filesCopy,
        file,
      ]);
    });

    it('should update localStorage key FILES when saveFiles is called', () => {
      const setItemSpy = spyOn(localStorage, 'setItem');
      const removeItemSpy = spyOn(localStorage, 'removeItem');
      const file = { title: 'Title1', size: 10 };

      component.saveFile(file);

      expect(removeItemSpy).toHaveBeenCalled();
      expect(setItemSpy).toHaveBeenCalled();
    });
  });
});
