import { TimeOutService } from 'src/app/services/time-out.service';
import { MouseClickDirective } from 'src/app/shared/directives/mouse-move.directive';

describe('MouseActiveDirective', () => {
  let timeOutSpy: jasmine.SpyObj<TimeOutService>;
  let directive: MouseClickDirective;

  beforeEach(() => {
    let timeOutServiceSpyOriginal: jasmine.SpyObj<TimeOutService> =
      jasmine.createSpyObj('timeOutService', {
        setTimeOutClock: () => {},
        clearTimeoutClock: () => {},
      });

    timeOutSpy = timeOutServiceSpyOriginal;

    directive = new MouseClickDirective(timeOutSpy);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should stop mouse and cleart timeOut', () => {
    const clearTimeOutSpy = spyOn(window, 'clearTimeout');
    directive.mouseClickClock = setTimeout(() => {}, 100);

    directive.click();

    expect(directive.mouseClickClock).toBeTruthy();
    expect(timeOutSpy.clearTimeoutClock).toHaveBeenCalled();
    expect(clearTimeOutSpy).toHaveBeenCalled();
  });

  it('should call onMouseClickRoutine on click', () => {
    const onMouseClickRoutineSpy = spyOn(directive, 'onMouseClickRoutine');
    const checkMouseClickAndStopClockSpy = spyOn(
      directive,
      'checkMouseClickAndStopClock'
    );
    directive.isActive = true;

    directive.click();

    expect(onMouseClickRoutineSpy).toHaveBeenCalled();
    expect(checkMouseClickAndStopClockSpy).not.toHaveBeenCalled();
  });

  it('should call checkMouseClickAndStopClock on click', () => {
    const onMouseClickRoutineSpy = spyOn(directive, 'onMouseClickRoutine');
    const checkMouseClickAndStopClockSpy = spyOn(
      directive,
      'checkMouseClickAndStopClock'
    );
    directive.isActive = false;

    directive.click();

    expect(onMouseClickRoutineSpy).not.toHaveBeenCalled();
    expect(checkMouseClickAndStopClockSpy).toHaveBeenCalled();
  });
});
