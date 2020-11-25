import { DropzoneDirective } from './dropzone.directive';
export interface WidgetDragEvent{
    event:PointerEvent,
    data?:any,
    dropzone?:DropzoneDirective
  }