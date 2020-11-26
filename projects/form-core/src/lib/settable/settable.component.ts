import { Component, ContentChild, HostBinding, HostListener, Input, OnInit, Optional, ViewChild, OnDestroy } from '@angular/core';
import { SettingService } from './setting.sevice';
import { SFItemComponent } from '../sf-item.component';
import { FormProperty } from '../model/form.property';
import { SFComponent } from '../sf.component';

@Component({
  selector: 'app-settable',
  templateUrl: './settable.component.html',
  styleUrls: ['./settable.component.scss']
})
export class SettableComponent implements OnInit, OnDestroy {

  @Input() formProperty: FormProperty;

  enable: boolean;

  @HostBinding('class.selected')
  get selected() {
    if (!this.enable) {
      return false;
    }
    return this === this.settingService.current;
  }
  // @HostBinding('class.is-empty')
  // get isEmpty()
  // {
  //     return this.config.layout && this.config.layout.length == 0;
  // }

  @ContentChild(SFItemComponent, { static: true })
  sfItem: SFItemComponent;

  constructor(private settingService: SettingService, @Optional() private sf: SFComponent) {
    if (sf && sf.settable) {
      this.enable = true;
    }
  }


  ngOnInit(): void {
    if (this.enable) {
      this.settingService.register(this.formProperty.path, this);
    }
  }

  ngOnDestroy(): void {
    console.log('SettableComponent destory :: ');
    if (this.enable) {
      this.settingService.unregister(this.formProperty.path, this);
    }
  }
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    if (this.enable) {
      event.stopPropagation();
      event.preventDefault();

      console.log('selected settable sfitem ::', this.sfItem);

      console.log('selected settable sfitem.formproperty ::', this.sfItem.formProperty);
      this.settingService.active(this);
    }
  }


}
