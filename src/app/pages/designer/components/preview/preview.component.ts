import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  editorOptions = { theme: 'vs-light', language: 'javascript' };
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  public get value(): string {
    return this.code;
  }

  public set value(v: string) {
    this.code = v;
    this.designerService.changeConfig(JSON.parse(v));
  }

  constructor(private designerService: DesignerService) { }

  ngOnInit(): void {
    this.code = JSON.stringify(this.designerService.config);
  }

}
