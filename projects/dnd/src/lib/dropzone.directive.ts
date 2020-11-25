import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
  SkipSelf,
  ViewChildren,
  QueryList,
  ContentChildren,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  Input,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { DroppableService } from './droppable.service';
import { WidgetDragEvent } from './draggable-model';

@Directive({
  selector: '[appDropzone]',
  // selector: '[appDropzone],[role-layout],app-layout'
})
export class DropzoneDirective
  implements OnInit, AfterContentInit, AfterViewInit {
  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Input() dropView: ViewContainerRef;

  @Output() onDragDrop = new EventEmitter<WidgetDragEvent>();
  @Output() onDragEnd = new EventEmitter<WidgetDragEvent>();
  @Output() onDragOver = new EventEmitter<WidgetDragEvent>();
  @Output() onDragLeave = new EventEmitter<WidgetDragEvent>();

  public clientRect: ClientRect;

  public childrenDropzone: Array<any>;

  constructor(
    private droppableService: DroppableService,
    private element: ElementRef,
    private _changeDetectRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.droppableService.dropzoneDirectiveInstance.push(this);

    this.droppableService.dragStart$.subscribe((event) =>
      this.dragStart(event)
    );
    this.droppableService.dragEnd$.subscribe((event) => this.dragEnd(event));

    this.droppableService.dragMove$.subscribe((event) => {
      if (this.isClosed(event)) {
        this.dragOver(event);
      } else {
        this.dragLeave(event);
      }
    });
  }
  ngAfterContentInit(): void {
    // console.log("content",this.target);
  }
  ngAfterViewInit() {
    // console.log("content1",this.target1);
  }
  private dragOver(event: WidgetDragEvent): void {
    if (!this.activated) {
      return;
    }
    this.entered = true;
    this.renderer.addClass(this.element.nativeElement, 'dropzone-entered');
    this.onDragOver.emit(event);
    // this._changeDetectRef.detectChanges();
  }

  private dragLeave(event: WidgetDragEvent): void {
    if (!this.activated) {
      return;
    }

    this.entered = false;
    this.renderer.removeClass(this.element.nativeElement, 'dropzone-entered');
    this.onDragLeave.emit(event);
    // this._changeDetectRef.detectChanges();
  }

  private dragStart(event: WidgetDragEvent): void {
    this.activated = true;
    this.renderer.addClass(this.element.nativeElement, 'dropzone-activated');

    // 因为设置拖拽时，容器自动增加padding方便拖入，故延迟绑定，防止clientRact计算不准的情况。
    // setTimeout(() => {
    this.clientRect = this.element.nativeElement.getBoundingClientRect();
    // }, 0);
    // this._changeDetectRef.detectChanges();
  }

  private dragEnd(event: WidgetDragEvent): void {
    if (!this.activated) {
      return;
    }
    if (this.entered && this.isClosed(event)) {
      this.onDragDrop.emit(event);
    }

    this.activated = false;
    this.entered = false;
    this.renderer.removeClass(this.element.nativeElement, 'dropzone-entered');
    this.renderer.removeClass(this.element.nativeElement, 'dropzone-activated');
    // this._changeDetectRef.detectChanges();
  }

  private isClosed(event: WidgetDragEvent) {
    return this.droppableService.closedDirective === this;
  }
}
