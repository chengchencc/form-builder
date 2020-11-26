import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PreviewComponent } from './components/preview/preview.component';
import { layoutComponents, pageComponents, formComponents } from '../../core/dragableItems';
import { DesignerService } from './services/designer.service';
import { uuid } from '@util';
import { SFSchema } from '@form';
import { FormComponent } from '@core/dragableItems';
import { SettingService } from '../../../../projects/form-core/src/lib/settable/setting.sevice';
import { SettableComponent } from '../../../../projects/form-core/src/lib/settable/settable.component';
import { WidgetRegistry } from '../../../../projects/form-core/src/lib/widget.factory';

function getId(): string {
  return uuid(8, 10);
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShellComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'json' };

  code = 'function x() {\nconsole.log("Hello world!");\n}';

  dragableItems = [
    {
      title: '布局组件',
      components: layoutComponents
    },
    {
      title: '页面组件',
      components: pageComponents
    },
    {
      title: '表单组件',
      components: formComponents
    }
  ];

  optionsSchema: SFSchema;
  formData: any;

  constructor(
    private drawerService: NzDrawerService,
    private designerService: DesignerService,
    private settingService: SettingService,
    private widgetRegistry: WidgetRegistry) { }

  ngOnInit(): void {
    this.settingService.onSelectedChange.subscribe((s: SettableComponent) => {
      this.optionsSchema = this.widgetRegistry.getOptionsSchema(s.formProperty.schema.type);
      console.log('current Setting optionsSchema :: ', this.optionsSchema);
      this.formData = this.settingService.current.formProperty.schema;
      console.log('formData :: ', this.formData);
    });
  }

  onDroped(event: any): void {
    console.log('##Droped：', event);
    console.log(getId());
    const formComponent = (event.data as FormComponent);
    const schema = formComponent.schema;
    const fieldName = getId();
    const { config } = this.designerService;
    config.properties[fieldName] = schema;

    const clonedConfig = Object.assign({}, config);

    this.designerService.changeConfig(clonedConfig);
  }

  openDrawer(): void {
    const drawerRef = this.drawerService.create<PreviewComponent, { value: string }, string>({
      nzTitle: '预览',
      nzContent: PreviewComponent,
      nzContentParams: {
        // value: this.value
      },
      nzWidth: '100%'
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe((data) => {
      console.log(data);
      if (typeof data === 'string') {
        // this.value = data;
        console.log('drawer close data!', data);
      }
    });
  }

  formValueChange(event) {
    console.log('formValueChange :: ', event);


    // console.log('settingservice :: ', this.settingService.current);
    // console.log('designerService :: ', this.designerService);


  }
  formChange(event) {
    console.log('formchange :: ', event);

    const { schema, path } = this.settingService.current.formProperty;
    const config = this.findByPath(this.designerService.config, path);
    // 引用类型，通过assign修改内部变量值
    Object.assign(config, event);
    this.designerService.changeConfig({...this.designerService.config});
  }

  findByPath(sfschema: SFSchema, path: string) {
    const pathes = path.split('/');
    let config = sfschema;
    for (const el of pathes) {
      if (el) {
        config = config.properties[el];
      }
    }
    return config;
  }

}
