import { Injectable } from '@angular/core';
import { FileItem } from 'src/app/home/types/filte-item.interface';
import { StoreService } from 'src/app/store/store.service';
import { ACTION_TYPES } from 'src/app/core/enums/action-types.enum';

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
    this.storeService.storeObs<boolean>(ACTION_TYPES.IS_LOGGED_IN, false);
    this.storeService.storeObs<boolean>(ACTION_TYPES.IS_UPLOADING, false);

    this.initializeFiles();
  }

  public initializeFiles(): void {
    const files =
      (JSON.parse(localStorage.getItem(ACTION_TYPES.FILES)) as FileItem) ??
      this.files;

    this.storeService.storeObs(ACTION_TYPES.FILES, files);
    localStorage.setItem(ACTION_TYPES.FILES, JSON.stringify(files));
  }
}
