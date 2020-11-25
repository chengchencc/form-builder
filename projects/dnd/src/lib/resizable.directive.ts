import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {

  @HostBinding("class.resizable") resizable = true;
  @HostBinding('class.resizing') resizing = false;

  pointerId?: number;

  clientRect: ClientRect;

  constructor(public element: ElementRef) {
  }

  // @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    this.clientRect = this.element.nativeElement.getBoundingClientRect();

    const currentElemRect:ClientRect = (<any>event.target).getBoundingClientRect();

    console.log(this.clientRect,event);

    if (this.clientRect.right - 10 < currentElemRect.right && this.clientRect.right + 10 > currentElemRect.right) {
      event.stopPropagation();
      event.preventDefault();
      this.pointerId = event.pointerId;
      this.resizing = true;
      console.log("start resizing!!!",this.clientRect);
    }
    // if(event.clientX>)



    // this.dragStart.emit({event:event,data:this.passData});
  }

  // @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.resizing) return;
    console.log(event);
    this.element.nativeElement.style.width = event.x + 'px';
  }

  // @HostListener('document:pointercancel', ['$event'])
  // @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.resizing) return;
    this.resizing = false;
  }
}
