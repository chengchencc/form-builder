import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { DesignerRoutingModule } from './designer-routing.module';



@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    DesignerRoutingModule
  ]
})
export class DesignerModule { }
