import { Directive, HostListener } from '@angular/core';
import { DroppableService } from './droppable.service';
import { WidgetDragEvent } from './draggable-model';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective {
  constructor(private droppableService: DroppableService) {}

  @HostListener('dragStart', ['$event'])
  onDragStart(event: WidgetDragEvent): void {
    this.droppableService.onDragStart(event);
    console.log('dropable---dragstart');
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: WidgetDragEvent): void {
    console.log('dropable---move');
    this.droppableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: WidgetDragEvent): void {
    console.log('dropable---end');
    this.droppableService.onDragEnd(event);
  }
}
