import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public obsStore = new Map<string, BehaviorSubject<any>>();

  constructor() {}

  public updateObs<Type>(type: string, value: Type): void {
    const obs = this.obsStore.get(type);

    obs ? obs.next(value) : this.storeObs(type, value);
  }

  public storeObs<Type>(type: string, value: Type): void {
    this.obsStore.set(type, new BehaviorSubject<Type>(value));
  }

  public getObs<Type>(type: string): Observable<Type> {
    const obs = this.obsStore.get(type);

    if (obs) {
      return obs.asObservable();
    } else {
      this.storeObs(type, null);
      return this.obsStore.get(type);
    }
  }
}
