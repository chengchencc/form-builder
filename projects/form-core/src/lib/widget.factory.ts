import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormProperty } from './model/form.property';
import { SFUISchemaItem } from './schema/ui';
import { Widget } from './widget';
import { SFSchema } from './schema/index';

export interface WidgetRegistryInfo {
  ctor: Widget<FormProperty, SFUISchemaItem>;
  optionsSchema: SFSchema;
}

export class WidgetRegistry {
  private _widgets: { [type: string]: WidgetRegistryInfo } = {};

  private defaultWidget: Widget<FormProperty, SFUISchemaItem>;

  private defaultOptionsSchema: SFSchema;

  get widgets(): { [type: string]: WidgetRegistryInfo } {
    return this._widgets;
  }

  setDefault(widget: any): void {
    this.defaultWidget = widget;
  }

  setDefaultOptionsSchema(schema: SFSchema): void {
    this.defaultOptionsSchema = schema;
  }

  register(type: string, widget: any, optionsSchema: SFSchema = null): void {
    this._widgets[type] = {
      ctor: widget,
      optionsSchema: optionsSchema || this.defaultOptionsSchema
    };
  }

  has(type: string): boolean {
    return this._widgets.hasOwnProperty(type);
  }

  getType(type: string): Widget<FormProperty, SFUISchemaItem> {
    if (this.has(type)) {
      return this._widgets[type].ctor;
    }
    return this.defaultWidget;
  }

  getOptionsSchema(type: string): SFSchema {
    if (this.has(type)) {
      return this._widgets[type].optionsSchema || this.defaultOptionsSchema;
    }
    return this.defaultOptionsSchema;
  }

}

@Injectable()
export class WidgetFactory {
  constructor(private registry: WidgetRegistry, private resolver: ComponentFactoryResolver) { }

  createWidget(container: ViewContainerRef, type: string): ComponentRef<Widget<FormProperty, SFUISchemaItem>> {
    if (!this.registry.has(type)) {
      console.warn(`No widget for type "${type}"`);
    }

    const componentClass = this.registry.getType(type) as any;
    const componentFactory = this.resolver.resolveComponentFactory<Widget<FormProperty, SFUISchemaItem>>(componentClass);
    return container.createComponent(componentFactory);
  }
}
