import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  constructor(private el: ElementRef) {
  }
  
  @HostListener('animationend') animationEnd()
  {
    this.el.nativeElement.focus();
  }

  @HostListener('focusin') focus()
  {
    this.el.nativeElement.style.border = 'solid 2px green';
  }

  @HostListener('focusout') focusEnd()
  {
    this.el.nativeElement.style.border = 'none';
  }
}
