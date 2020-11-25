import { Component, Input, OnInit } from '@angular/core';
import { SFButton, SFSchema } from '@form';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  schema: SFSchema;

  // /** 表单布局，等同 `nzLayout`，默认：horizontal */
  // @Input() layout: SFLayout = 'horizontal';
  // /** JSON Schema */
  // @Input() schema: SFSchema;
  // /** UI Schema */
  // @Input() ui: SFUISchema;
  // /** 表单默认值 */
  // @Input() formData: {};
  // /**
  //  * 按钮
  //  * - 值为 `null` 或 `undefined` 表示手动添加按钮，但保留容器
  //  * - 值为 `none` 表示手动添加按钮，且不保留容器
  //  * - 使用 `spanLabelFixed` 固定标签宽度时，若无 `render.class` 则默认为居中状态
  //  */
  @Input() button: SFButton | 'none' = null;
  // /**
  //  * 是否实时校验，默认：`true`
  //  * - `true` 每一次都校验
  //  * - `false` 提交时校验
  //  */
  // @Input() @InputBoolean() liveValidate = true;
  // /** 指定表单 `autocomplete` 值 */
  // @Input() autocomplete: 'on' | 'off';
  // /** 立即显示错误视觉 */
  // @Input() @InputBoolean() firstVisual = true;
  // /** 是否只展示错误视觉不显示错误文本 */
  // @Input() @InputBoolean() onlyVisual = false;
  // @Input() @InputBoolean() compact = false;
  // /** 表单模式 */
  // @Input()
  // set mode(value: SFMode) {
  //   switch (value) {
  //     case 'search':
  //       this.layout = 'inline';
  //       this.firstVisual = false;
  //       this.liveValidate = false;
  //       if (this._btn) {
  //         this._btn.submit = this._btn.search;
  //       }
  //       break;
  //     case 'edit':
  //       this.layout = 'horizontal';
  //       this.firstVisual = false;
  //       this.liveValidate = true;
  //       if (this._btn) {
  //         this._btn.submit = this._btn.edit;
  //       }
  //       break;
  //   }
  //   this._mode = value;
  // }
  // get mode(): SFMode {
  //   return this._mode;
  // }
  // private _mode: SFMode;
  // /**
  //  * Whether to load status，when `true` reset button is disabled status, submit button is loading status
  //  */
  // @Input() @InputBoolean() loading = false;
  // @Input() @InputBoolean() disabled = false;
  // @Input() @InputBoolean() noColon = false;
  // @Input() @InputBoolean() cleanValue = false;
  // @Output() readonly formValueChange = new EventEmitter<SFValueChange>();
  // @Output() readonly formChange = new EventEmitter<{}>();
  // @Output() readonly formSubmit = new EventEmitter<{}>();
  // @Output() readonly formReset = new EventEmitter<{}>();
  // @Output() readonly formError = new EventEmitter<ErrorData[]>();

  constructor(private designerService: DesignerService) { }

  ngOnInit(): void {
    this.schema = this.designerService.config;
    this.designerService.onConfigChanged.subscribe(config => {
      this.schema = config;
    });
  }

  submit(value: any) {
    console.log(value);
  }




}
