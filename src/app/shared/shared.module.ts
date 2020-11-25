import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...SHARED_ZORRO_MODULES
  ],
  exports: [
    CommonModule,
    ...SHARED_ZORRO_MODULES
  ]
})
export class SharedModule { }
