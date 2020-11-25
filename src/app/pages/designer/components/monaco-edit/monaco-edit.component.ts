import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';

// import * as monaco from 'monaco-editor/esm/vs/editor/editor.all.js';

@Component({
  selector: 'app-monaco-edit',
  templateUrl: './monaco-edit.component.html',
  styleUrls: ['./monaco-edit.component.scss']
})
export class MonacoEditComponent implements OnInit {

  @ViewChild('editor', { static: true })
  editorContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {

    // monaco.editor.create(this.editorContainer.nativeElement,
    //   {
    //     value: [
    //       'function x() {',
    //       '\tconsole.log("Hello world!");',
    //       '}'
    //     ].join('\n'),
    //     language: 'javascript'
    //   });
  }

}
