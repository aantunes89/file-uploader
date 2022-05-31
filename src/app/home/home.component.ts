import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StoreService } from 'src/app/store/store.service';
import { TimeOutService } from 'src/app/services/time-out.service';
import { FileItem } from 'src/app/home/types/filte-item.interface';
import { ClockStatus } from 'src/app/core/enums/clock-status.enum';

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
    this.initializeFiles();

    this.storeService.storeObs('IS_UPLOADING', false);
    this.isUploading$ = this.storeService.getObs('IS_UPLOADING');
  }

  public initializeFiles() {
    this.files$ = this.storeService
      .getObs('FILES')
      .pipe(tap((files) => (this.filesCopy = [...files])));
  }

  public uploadFile() {
    this.timeOutService.clearTimeoutClock();
    this.storeService.updateObs('IS_UPLOADING', true);
    this.storeService.updateObs(ClockStatus.START_CLOCK, true);

    setTimeout(() => {
      this.saveFile({
        title: `File ${this.filesCopy.length + 1}`,
        size: Math.round(Math.random() * 100),
      });

      this.timeOutService.setTimeOutClock();
      this.storeService.updateObs('IS_UPLOADING', false);

      // apagar
      this.storeService.updateObs(ClockStatus.START_CLOCK, false);
      this.storeService.updateObs(ClockStatus.START_CLOCK, true);
    }, 20000);
  }

  public saveFile(fileItem: FileItem) {
    localStorage.removeItem('FILES');

    const newFileList = [...this.filesCopy, fileItem];

    localStorage.setItem('FILES', JSON.stringify(newFileList));
    this.storeService.updateObs('FILES', newFileList);
  }
}
