/**
 * @author [chengchen]
 * @email [chengchen216@hotmail.com]
 * @create date 2019-05-09 14:32:05
 * @modify date 2019-05-09 14:32:05
 * @desc [description]
 */
import { Directive, HostListener, HostBinding, Optional, SkipSelf, Input, ElementRef, Output, EventEmitter, IterableDiffers, KeyValueDiffers, Renderer2, DoCheck, IterableChanges, IterableDiffer, KeyValueDiffer, KeyValueChanges } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { SettingService } from './setting.sevice';
// import { Layout } from '../common/layout';

@Directive({
    selector: '[appSettable]',
    exportAs: 'appSettable'
})
export class WidgetSettableDirective implements DoCheck {

    private _config: any;
    // 记录class变更
    private _classesIterableDiffer?: IterableDiffer<string>;
    // 记录style变更
    private _styleKeyValueDiffer?: KeyValueDiffer<string, string | number>;
    @Output() onSelected = new EventEmitter<boolean>();

    constructor(
        @SkipSelf() @Optional() public parent: WidgetSettableDirective,
        public elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        private settingService: SettingService,
        private _iterableDiffers: IterableDiffers,
        private _keyValueDiffers: KeyValueDiffers,
        private _ngEl: ElementRef,
        private _renderer: Renderer2
    ) { }

    public get config() {
        return this._config;
    }

    @Input()
    public set config(v: any) {
        this._config = v;
        // 确保differ只建立一次
        if (!this._classesIterableDiffer && v && v.classes) {
            this._classesIterableDiffer = this._iterableDiffers.find(v.classes).create();
        }

        if (!this._styleKeyValueDiffer && v && v.style) {
            this._styleKeyValueDiffer = this._keyValueDiffers.find(v.style).create();
        }
    }

    @HostBinding('class.selected')
    get selected() {
        return this == this.settingService.selectedSettable;
    }
    @HostBinding('class.is-empty')
    get isEmpty()
    {
        return this.config.layout && this.config.layout.length == 0;
    }

    ngOnInit() {
        // 方式2：
        // this.settingService.onChangeConfig$.subscribe(layout =>{
        //    if(this._config == layout){
        //     this._checkClassesAndStyleChangesThenApply();
        //    }
        // });
        // this._checkClassesAndStyleChangesThenApply();

        // 把自己注册到 map 里
        this.settingService.configSettableMap[this._config.id] = this;
    }

    /**
     * 方式1，通过ng自带的变化检测，
     * 方式2，通过手动订阅 `this.settingService.onChangeConfig$` 方式。
     * 按理说方式2性能会更好,因为通知更准确，可以通知到更加具体的directive，不需要所有directive去做变更检测。但是考虑到稳定性，暂时启用方式1
     */
    ngDoCheck(): void {
        // console.log("settable directive DoChecking");
        this._checkClassesAndStyleChangesThenApply();
    }
    /** 变更class、style检查，并应用变更 */
    private _checkClassesAndStyleChangesThenApply() {
        // console.log('_checkClassesAndStyleChangesThenApply');
        if (this._classesIterableDiffer) {
            const classesChanges = this._classesIterableDiffer.diff(this._config.classes);
            if (classesChanges) {
                this._applyClassesIterableChanges(classesChanges);
            }
        }
        if (this._styleKeyValueDiffer) {
            const styleChanges = this._styleKeyValueDiffer.diff(this._config.style);
            if (styleChanges) {
                this._applyStyleChanges(styleChanges);
            }
        }
    }

    @HostListener('click', ['$event'])
    handleClick(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();

        this.settingService.selectSettable(this);
    }
    // TODO:mouse事件会导致angular频繁变化检查，暂时先去掉
    // @HostListener('mouseenter')
    handleEnter() {
        this.settingService.enterSettable(this);
    }
    // TODO:mouse事件会导致angular频繁变化检查，暂时先去掉
    // @HostListener('mouseleave')
    handleLeave() {
        this.settingService.leaveSettable();
    }

    onSelect() {
        this.onSelected.emit(this.selected);
    }
    /**
     * 移除自己
     */
    removeSelf() {
        this._config.parent.removeNode(this._config);
    }

    saveAsTemplate() {
        this.openModalWithComponent((tplName) => {
            // this.layoutService.addLayoutTemplate({
            //     name: tplName,
            //     id: "",
            //     layoutConfig: this.config
            // });
        });
    }
    // 选择上级
    selectParent(event: MouseEvent) {
        event.stopPropagation();
        if (this.parent) {
            this.settingService.selectSettable(this.parent);
        }
        console.log('settabledirective::', event);
    }

    openModalWithComponent(callback: any) {
        const initialState = {
            title: '请输入模板名称',
            onOk: callback
        };
        // this.bsModalRef = this.modalService.show(CreateTemplateModalComponent, {initialState});
        // this.bsModalRef.content.closeBtnName = 'Close';
    }

    getPath(): string[] {
        // TODO:目前出来的路径不对，需要完善

        const path: string[] = [];
        let next = this._config;
        while (next) {
            path.push(next.type);
            next = next.parent;
        }

        return path.reverse();
    }

    private _applyClassesIterableChanges(changes: IterableChanges<string>): void {
        changes.forEachAddedItem((record) => {
            if (typeof record.item === 'string') {
                this._toggleClass(record.item, true);
            } else {
                throw new Error(`classes 仅支持 string 类型！`);
            }
        });
        changes.forEachRemovedItem((record) => this._toggleClass(record.item, false));
    }

    /**
      * Applies a collection of CSS classes to the DOM element.
      *
      * For argument of type Set and Array CSS class names contained in those collections are always
      * added.
      * For argument of type Map CSS class name in the map's key is toggled based on the value (added
      * for truthy and removed for falsy).
      */
    private _applyClasses(rawClassVal: string[] | Set<string> | { [klass: string]: any }) {
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                ( rawClassVal as any).forEach((klass: string) => this._toggleClass(klass, true));
            } else {
                Object.keys(rawClassVal).forEach(klass => this._toggleClass(klass, !!rawClassVal[klass]));
            }
        }
    }

    /**
     * Removes a collection of CSS classes from the DOM element. This is mostly useful for cleanup
     * purposes.
     */
    private _removeClasses(rawClassVal: string[] | Set<string> | { [klass: string]: any }) {
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                ( rawClassVal as any).forEach((klass: string) => this._toggleClass(klass, false));
            } else {
                Object.keys(rawClassVal).forEach(klass => this._toggleClass(klass, false));
            }
        }
    }

    private _toggleClass(klass: string, enabled: boolean): void {
        klass = klass.trim();
        if (klass) {
            klass.split(/\s+/g).forEach(klass => {
                if (enabled) {
                    this._renderer.addClass(this._ngEl.nativeElement, klass);
                } else {
                    this._renderer.removeClass(this._ngEl.nativeElement, klass);
                }
            });
        }
    }

    private _applyStyleChanges(changes: KeyValueChanges<string, string | number>): void {
        changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
        changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
        changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
    }

    private _setStyle(nameAndUnit: string, value: string | number | null | undefined): void {
        const [name, unit] = nameAndUnit.split('.');
        value = value != null && unit ? `${value}${unit}` : value;

        if (value != null) {
            this._renderer.setStyle(this._ngEl.nativeElement, name, value as string);
        } else {
            this._renderer.removeStyle(this._ngEl.nativeElement, name);
        }
    }
}
