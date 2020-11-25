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
        format: 'email'
      },
      name: {
        type: 'string',
        title: '姓名',
        minLength: 5
      },
      remark: {
        type: 'string',
        title: '描述',
        ui: {
          widget: 'textarea',
          autosize: true,
          grid: {
            span: 24
          }
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
