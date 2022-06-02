import { TestBed } from '@angular/core/testing';
import { ACTION_TYPES } from '../core/enums/action-types.enum';

import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should populate obsStore Map', () => {
    expect(service.obsStore.size).toEqual(0);

    service.storeObs(ACTION_TYPES.IS_LOGGED_IN, false);

    expect(service.obsStore.size).toBeGreaterThan(0);
    expect(service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN)).toBeTruthy();
  });

  it('should change value in obsStore', () => {
    expect(service.obsStore.size).toEqual(0);

    service.storeObs(ACTION_TYPES.IS_LOGGED_IN, false);

    expect(service.obsStore.size).toEqual(1);
    expect(service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN).value).toEqual(
      false
    );

    service.updateObs(ACTION_TYPES.IS_LOGGED_IN, true);

    expect(service.obsStore.size).toEqual(1);
    expect(service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN).value).toEqual(true);
  });

  it("should store value if it doesn't exist", () => {
    expect(service.obsStore.size).toEqual(0);
    service.getObs(ACTION_TYPES.IS_LOGGED_IN);

    expect(service.obsStore.size).toEqual(1);
    expect(service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN).value).toEqual(null);
  });

  it("should store value if it doesn't exist when updating", () => {
    expect(service.obsStore.size).toEqual(0);

    service.updateObs(ACTION_TYPES.IS_LOGGED_IN, true);

    expect(service.obsStore.size).toEqual(1);
    expect(service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN).value).toEqual(true);
  });

  it("should store value if it doesn't exist when updating", () => {
    service.storeObs(ACTION_TYPES.IS_LOGGED_IN, true);

    const obs = service.obsStore.get(ACTION_TYPES.IS_LOGGED_IN);
    const asObservableSpy = spyOn(obs, 'asObservable');

    service.getObs(ACTION_TYPES.IS_LOGGED_IN);

    expect(asObservableSpy).toHaveBeenCalled();
  });
});
