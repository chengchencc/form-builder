import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular cdk
// import {DragDropModule} from '@angular/cdk/drag-drop';

// import zorro components
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

// import form component
import { DelonFormModule } from '@form';

import { SharedModule } from '../../shared/shared.module';

import { ShellComponent } from './shell.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { ContentComponent } from './components/content/content.component';

import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MonacoEditorModule } from '../../modules/monaco/index';
import { FormsModule } from '@angular/forms';
import { MonacoEditComponent } from './components/monaco-edit/monaco-edit.component';
import { PreviewComponent } from './components/preview/preview.component';
import { DraggableModule } from '@dnd/lib';

const zorroComponents = [
  NzPageHeaderModule,
  NzBreadCrumbModule,
  NzTagModule,
  NzDropDownModule,
  NzDrawerModule
];


@NgModule({
  declarations: [ShellComponent, ContentComponent, PageHeaderComponent, MonacoEditComponent, PreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    // DragDropModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzTagModule,
    NzDropDownModule,
    NzDrawerModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
    DesignerRoutingModule,
    DelonFormModule.forRoot(),
    DraggableModule,
    SharedModule
  ]
})
export class DesignerModule { }
