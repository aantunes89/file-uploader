import { Injectable } from '@angular/core';
import { FileItem } from 'src/app/home/types/filte-item.interface';
import { StoreService } from 'src/app/store/store.service';
import { LOGIN_STATUS } from 'src/app/core/enums/login-status.enum';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  public files: FileItem[] = [
    { title: 'File 1', size: 30 },
    { title: 'File 2', size: 30 },
    { title: 'File 3', size: 30 },
  ];

  constructor(private storeService: StoreService) {}

  public initializeApp(): void {
    this.storeService.storeObs(LOGIN_STATUS.IS_LOGGED_IN, false);
    const files = localStorage.getItem('FILES');

    files
      ? this.storeService.storeObs('FILES', JSON.parse(files))
      : this.initializeLocalStorageAndStore();
  }

  initializeLocalStorageAndStore() {
    localStorage.setItem('FILES', JSON.stringify(this.files));
    this.storeService.storeObs('FILES', this.files);
  }
}
