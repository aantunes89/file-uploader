import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseActive]',
})
export class MouseActiveDirective {
  constructor() {}

  @HostListener('mouseover')
  mouseover() {
    console.log('Mouse moving');
  }
}
