import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTION_TYPES } from '../core/enums/action-types.enum';
import { FileItem } from '../home/types/filte-item.interface';
import { StoreService } from '../store/store.service';

import { StartupService } from './startup.service';

describe('StartupService', () => {
  let service: StartupService;
  let storeServiceSpy: StoreService;

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
    service = TestBed.inject(StartupService);
    storeServiceSpy = TestBed.inject(StoreService);

    service.files = [
      { title: 'File 1', size: 30 },
      { title: 'File 2', size: 30 },
      { title: 'File 3', size: 30 },
    ];
  });

  it('should call storeObs 3 times', () => {
    service.initializeApp();
    expect(storeServiceSpy.storeObs).toHaveBeenCalledTimes(3);
  });

  it('should store isLogggedIn state as false on aplication boot', () => {
    service.initializeApp();
    expect(storeServiceSpy.storeObs).toHaveBeenCalledWith(
      ACTION_TYPES.IS_LOGGED_IN,
      false
    );
  });

  it('should store isUploading state as false on aplication boot', () => {
    service.initializeApp();

    expect(storeServiceSpy.storeObs).toHaveBeenCalledWith(
      ACTION_TYPES.IS_UPLOADING,
      false
    );
  });

  it('should store files in state on aplication boot', () => {
    service.initializeApp();

    if (JSON.parse(localStorage.getItem(ACTION_TYPES.FILES))) {
      expect(storeServiceSpy.storeObs).toHaveBeenCalledWith(
        ACTION_TYPES.FILES,
        JSON.parse(localStorage.getItem(ACTION_TYPES.FILES))
      );
    } else {
      expect(storeServiceSpy.storeObs).toHaveBeenCalledWith(
        ACTION_TYPES.FILES,
        service.files
      );
    }
  });

  it('should store files in localStorage on aplication boot', () => {
    service.initializeApp();

    const files: FileItem[] = JSON.parse(localStorage.getItem('FILES'));
    expect(files.length).toBeGreaterThan(0);
  });

  it('should call localStorage setItem on aplication boot', () => {
    const localStorageSpy = spyOn(localStorage, 'setItem');
    service.initializeApp();

    expect(localStorageSpy).toHaveBeenCalled();
  });
});
