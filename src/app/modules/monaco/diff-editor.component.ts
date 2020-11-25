import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

// import { BaseEditorComponent } from './base-editor';
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from './config';
import { EditorService } from './editor.service';
import { DiffEditorModel } from './types';

declare const monaco: any;

@Component({
  selector: 'ngx-monaco-diff-editor',
  template: '<div class="editor-container" #editorContainer></div>',
  styles: [`
    :host {
      display: block;
      height: 200px;
    }

    .editor-container {
      width: 100%;
      height: 98%;
    }
  `]
})
export class DiffEditorComponent implements AfterViewInit, OnDestroy {

  @ViewChild('editorContainer', { static: true }) _editorContainer: ElementRef;
  @Output() onInit = new EventEmitter<any>();
  protected _editor: any;
  protected _options: any;
  protected _windowResizeSubscription: Subscription;

  _originalModel: DiffEditorModel;
  _modifiedModel: DiffEditorModel;

  @Input('options')
  set options(options: any) {
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): any {
    return this._options;
  }

  @Input('originalModel')
  set originalModel(model: DiffEditorModel) {
    this._originalModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options);
    }
  }

  @Input('modifiedModel')
  set modifiedModel(model: DiffEditorModel) {
    this._modifiedModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options);
    }
  }

  constructor(
    private zone: NgZone,
    @Inject(NGX_MONACO_EDITOR_CONFIG) private config: NgxMonacoEditorConfig,
    private editorService: EditorService) {

  }
  ngOnDestroy(): void {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }
  async ngAfterViewInit() {
    await this.editorService.init(this.config);
    this.initMonaco(this._options);
  }

  protected initMonaco(options: any): void {

    if (!this._originalModel || !this._modifiedModel) {
      throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
    }

    this._originalModel.language = this._originalModel.language || options.language;
    this._modifiedModel.language = this._modifiedModel.language || options.language;

    const originalModel = monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
    const modifiedModel = monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);

    this._editorContainer.nativeElement.innerHTML = '';
    const theme = options.theme;
    this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
    options.theme = theme;
    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });

    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    this.onInit.emit(this._editor);
  }

}
