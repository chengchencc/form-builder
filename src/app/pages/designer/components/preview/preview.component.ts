import { Component, Input, OnInit } from '@angular/core';
import { SFButton, SFSchema } from '@form';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  editorOptions = { theme: 'vs-light', language: 'javascript' };
  code = '';

  schema: SFSchema;

  @Input() button: SFButton | 'none' = null;

  public get value(): string {
    return this.code;
  }

  public set value(v: string) {
    this.code = v;
    if (this.code){
      this.designerService.changeConfig(JSON.parse(v));
    }
  }

  constructor(private designerService: DesignerService) { }

  ngOnInit(): void {
    this.code = JSON.stringify(this.designerService.config);

    this.schema = this.designerService.config;
    this.designerService.onConfigChanged.subscribe(config => {
      this.schema = config;
    });
  }

  submit($event){

  }

}
