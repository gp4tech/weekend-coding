import { Directive, ElementRef, OnInit } from '@angular/core';

import { Modal } from 'materialize-css';

@Directive({
  selector: '[wcModal]'
})
export class ModalDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    Modal.init(this.elementRef.nativeElement);
  }
}
