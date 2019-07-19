import { Directive, ElementRef, AfterViewInit } from '@angular/core';

import { FormSelect } from 'materialize-css';

@Directive({
  selector: '[wcSelect]'
})
export class SelectDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    FormSelect.init(this.elementRef.nativeElement);
  }
}
