import { Directive, HostListener, Input } from '@angular/core';
import { TimeOutService } from 'src/app/services/time-out.service';

@Directive({
  selector: '[mouseClick]',
})
export class MouseClickDirective {
  @Input('isActive') isActive: boolean = true;

  mouseClickClock;

  constructor(private timeOutService: TimeOutService) {}

  @HostListener('click')
  click() {
    this.isActive
      ? this.onMouseClickRoutine()
      : this.checkMouseClickAndStopClock();
  }

  onMouseClickRoutine() {
    this.checkMouseClickAndStopClock();

    this.mouseClickClock = window.setTimeout(() => {
      this.timeOutService.setTimeOutClock();
    }, 500);
  }

  checkMouseClickAndStopClock() {
    this.timeOutService.clearTimeoutClock();
    this.mouseClickClock && window.clearTimeout(this.mouseClickClock);
  }
}
