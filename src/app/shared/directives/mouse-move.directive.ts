import { Directive, HostListener, Input } from '@angular/core';
import { TimeOutService } from 'src/app/services/time-out.service';

@Directive({
  selector: '[mouseMove]',
})
export class MouseMoveDirective {
  @Input('isActive') isActive: boolean = true;

  mouseMoveClock;

  constructor(private timeOutService: TimeOutService) {}

  @HostListener('mousemove')
  mouseenter() {
    this.isActive
      ? this.onMouseMoveRoutine()
      : this.checkMouseMoveAndStopClock();
  }

  onMouseMoveRoutine() {
    this.checkMouseMoveAndStopClock();

    this.mouseMoveClock = setTimeout(() => {
      this.timeOutService.setTimeOutClock();
    }, 500);
  }

  checkMouseMoveAndStopClock() {
    this.timeOutService.clearTimeoutClock();
    this.mouseMoveClock && clearTimeout(this.mouseMoveClock);
  }
}
