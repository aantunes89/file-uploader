import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public obsStore = new Map<string, BehaviorSubject<any>>();

  constructor() {}

  public updateObs(type: string, value: any): void {
    const obs = this.obsStore.get(type);

    obs ? obs.next(value) : this.storeObs(type, value);
  }

  public storeObs(type: string, value: any): void {
    this.obsStore.set(type, new BehaviorSubject(value));
  }

  public getObs(type: string) {
    const obs = this.obsStore.get(type);

    if (obs) {
      return obs.asObservable();
    } else {
      this.storeObs(type, null);
      return this.obsStore.get(type);
    }
  }
}
