import { Injectable } from '@angular/core';
import { SFSchema } from '@form';
import { Observable, Subject } from 'rxjs';
import { Page } from '@core/page.interface';

@Injectable({
  providedIn: 'root',
})
export class DesignerService {
  /**
   * 页面配置
   */
  // config: SFSchema = {
  //   properties: {},
  //   required: [],
  //   ui: {
  //     spanLabelFixed: 100,
  //     grid: {
  //       span: 8,
  //     },
  //   },
  // };

  config: SFSchema = {
    properties: {
      email: {
        type: 'string',
        title: '邮箱',
        format: 'email',
        ui: {
          widget: 'string',
          grid: { span: 24 }
        }
      },
      name: {
        type: 'string',
        title: '姓名',
        minLength: 5,
        ui: {
          widget: 'string',
          grid: { span: 24 }
        }
      },
      range: {
        type: 'number',
        title: '范围',
        default: 12,
        minimum: 1,
        maximum: 24,
        ui: {
          widget: 'slider',
          grid: { span: 24 }
        }
      }
    },
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24
      }
    }
  };

  /**
   * 历史记录
   */
  history: any[] = [];
  /**
   * 配置信息改变订阅
   */
  public onConfigChanged = new Subject<any>();
  /**
   * 主动修改配置信息
   * @param config 页面配置信息
   */
  changeConfig(config: any) {
    console.log('change config :: ', config);
    this.history.push(this.config);
    this.config = config;
    this.onConfigChanged.next(config);
  }

}
