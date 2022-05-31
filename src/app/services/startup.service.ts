import { Injectable } from '@angular/core';
import { FileItem } from '../home/types/filte-item.interface';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  public files: FileItem[] = [
    { title: 'File 1', size: 30 },
    { title: 'File 2', size: 30 },
    { title: 'File 3', size: 30 },
  ];

  constructor(private store: StoreService) {}

  public initializeApp(): void {
    const files = localStorage.getItem('FILES');

    files
      ? this.store.storeObs('FILES', JSON.parse(files))
      : this.initializeLocalStorageAndStore();
  }

  initializeLocalStorageAndStore() {
    localStorage.setItem('FILES', JSON.stringify(this.files));
    this.store.storeObs('FILES', this.files);
  }
}
