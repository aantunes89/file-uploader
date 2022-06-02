import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StoreService } from 'src/app/store/store.service';
import { TimeOutService } from 'src/app/services/time-out.service';
import { FileItem } from 'src/app/home/types/filte-item.interface';
import { ACTION_TYPES } from 'src/app/core/enums/action-types.enum';
import { CLOCK_STATUS } from '../core/enums/clock-status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filesCopy: FileItem[];

  public files$: Observable<FileItem[]>;
  public isUploading$: Observable<boolean>;

  constructor(
    private storeService: StoreService,
    private timeOutService: TimeOutService
  ) {}

  public ngOnInit(): void {
    this.timeOutService.setTimeOutClock();
    this.initializeValues();

    this.storeService.updateObs(ACTION_TYPES.IS_LOGGED_IN, true);
  }

  public initializeValues() {
    this.files$ = this.storeService
      .getObs<FileItem[]>(ACTION_TYPES.FILES)
      .pipe(tap((files) => (this.filesCopy = [...files])));

    this.isUploading$ = this.storeService.getObs<boolean>(
      ACTION_TYPES.IS_UPLOADING
    );
  }

  public uploadFile() {
    this.timeOutService.clearTimeoutClock();
    this.storeService.updateObs(ACTION_TYPES.IS_UPLOADING, true);
    // this.storeService.updateObs(CLOCK_STATUS.START_CLOCK, true);

    setTimeout(() => {
      this.saveFile({
        title: `File ${this.filesCopy.length + 1}`,
        size: Math.round(Math.random() * 100),
      });

      this.timeOutService.setTimeOutClock();
      this.storeService.updateObs(ACTION_TYPES.IS_UPLOADING, false);
      // this.storeService.updateObs(CLOCK_STATUS.START_CLOCK, false);
    }, 20000);
  }

  public saveFile(fileItem: FileItem) {
    const newFileList = [...this.filesCopy, fileItem];
    this.storeService.updateObs(ACTION_TYPES.FILES, newFileList);

    localStorage.removeItem(ACTION_TYPES.FILES);
    localStorage.setItem(ACTION_TYPES.FILES, JSON.stringify(newFileList));
  }
}
