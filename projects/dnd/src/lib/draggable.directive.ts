import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
} from '@angular/core';
import { WidgetDragEvent } from './draggable-model';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  @Input() passData: any;
  @Output() dragStart = new EventEmitter<WidgetDragEvent>();
  @Output() dragMove = new EventEmitter<WidgetDragEvent>();
  @Output() dragEnd = new EventEmitter<WidgetDragEvent>();

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';
  @HostBinding('class.dragging') dragging = false;
  @HostBinding('class.draggable') draggable = true;

  pointerId?: number;

  pointerMoveRemoveListener: any;
  pointerUpRemoveListener: any;
  // pointerMoveHandler=this.onPointerDown.bind(this);

  constructor(
    public element: ElementRef,
    private _ngZone: NgZone,
    public renderer: Renderer2
  ) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    // added after YouTube video: ignore right-click
    if (event.button !== 0) {
      return;
    }
    this.pointerId = event.pointerId;
    this.dragging = true;
    this.dragStart.emit({ event: event, data: this.passData });
    // 注册 move 事件
    this._ngZone.runOutsideAngular(() => {
      // 会导致 dropzone 那边的 drppableService 不发送 dragMove 事件
      this.pointerMoveRemoveListener = this.renderer.listen(
        'document',
        'pointermove',
        this.onPointerMove.bind(this)
      );
    });

    this.pointerUpRemoveListener = this.renderer.listen(
      'document',
      'pointerup',
      this.onPointerUp.bind(this)
    );
  }

  // added after YouTube video: pointercancel
  // @HostListener('document:pointercancel', ['$event'])
  // @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    console.log(DraggableDirective.name, ' :: onPointerUp :: ', this.pointerId);

    this.dragging = false;
    this.dragEnd.emit({ event, data: this.passData });
    // 移除事件注册
    this.pointerMoveRemoveListener();
    this.pointerUpRemoveListener();
  }

  onPointerMove = (event: PointerEvent) => {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }
    this.dragMove.emit({ event, data: this.passData });
  }
}
