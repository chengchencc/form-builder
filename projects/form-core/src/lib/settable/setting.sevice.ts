import { SettableComponent } from './settable.component';
/**
 * @author [chengchen]
 * @email [chengchen216@hotmail.com]
 * @create date 2019-05-09 14:33:11
 * @modify date 2019-05-09 14:33:11
 * @desc [description]
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetSettableDirective } from './widget-settable.directive';
// import { Layout } from '../common/layout';

/**
 * 部件配置服务
 */
@Injectable({
    providedIn: 'root'
})
export class SettingService {
    /**
     * config -> settable 映射关系
    */
    public components: { [id: string]: SettableComponent } = {};
    /**
     * 当前选中项
     */
    public current: SettableComponent;
    /**
     * 改变选中项
     */
    public onSelectedChange = new Subject<SettableComponent>();
    /**
     * 当选中项Settings改变
     */
    public onSettingsChange = new Subject<any>();
    /**
     *  当前鼠标进入项
     */
    public hoveringSettable: SettableComponent;

    constructor() {
    }

    /**
     * 注册组件
     */
    public register(id: string, component: SettableComponent) {
        if (this.has(id)) {
            throw new Error('settableComponent 重复注册！');
        }
        this.components[id] = component;
    }
    /**
     * 移除注册的组件
     */
    public unregister(id: string, component: SettableComponent) {
        if (this.has(id)) {
            delete this.components[id];
        }
    }

    private has(type: string): boolean {
        return this.components.hasOwnProperty(type);
    }
    /**
     * 选中可设置项
     * @param item settable item
     */
    // activeSettable(item: WidgetSettableDirective) {
    //     this.selectedSettableItem && this.selectedSettableItem.unselect();
    //     this.selectedSettableItem = item;
    //     this.selectedSettableItem.selected = true;
    //     this.onSelectSettableItemSubject.next(item);
    //     this.onChangeConfigSubject$.next()
    // }
    /**
     * 选中一个 settable item
     * 有重载，所以传入这个 item 的 config id 或 settable 都行
     * @param value id 或 settable
     */
    active(value: string | SettableComponent) {
        this.current = typeof value === 'string' ? this.components[value] : value;
        this.onSelectedChange.next(this.current);
    }
    /** hover */
    // enterSettable(configIdOrSettable: string | WidgetSettableDirective) {
    //     this.hoveringSettable = typeof configIdOrSettable == 'string' ? this.configSettableMap[configIdOrSettable] : configIdOrSettable;
    // }
    // leaveSettable() {
    //     this.hoveringSettable = null;
    // }

    // TODO: remove
    // changeConfig(config) {
    //     this.onChangeConfigSubject$.next(config);
    // }
    // changeSettings(settings: any) {
    //     this.onSettingsChange.next(settings);
    // }

}
