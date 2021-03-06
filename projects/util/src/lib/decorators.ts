/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Type} from './type';

/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * ES7 syntax:
 *
 * ```
 * @ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @publicApi
 */
export interface TypeDecorator {
  /**
   * Invoke as ES7 decorator.
   */
  <T extends Type<any>>(type: T): T;

  // Make TypeDecorator assignable to built-in ParameterDecorator type.
  // ParameterDecorator is declared in lib.d.ts as a `declare type`
  // so we cannot declare this interface as a subtype.
  // see https://github.com/angular/angular/issues/3379#issuecomment-126169417
  (target: Object, propertyKey?: string|symbol, parameterIndex?: number): void;
}

export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';

/**
 * @suppress {globalThis}
 */
export function makeDecorator<T>(
    name: string, 
    props?: (...args: any[]) => any, 
    parentClass?: any,
    additionalProcessing?: (type: Type<T>) => void,
    typeFn?: (type: Type<T>, ...args: any[]) => void
    ):{new (...args: any[]): any; (...args: any[]): any; (...args: any[]): (cls: any) => any;} {
  const metaCtor = makeMetadataCtor(props);

  function DecoratorFactory(...args: any[]): (cls: Type<T>) => any {
    if (this instanceof DecoratorFactory) {
      metaCtor.call(this, ...args);
      return this;
    }

    const annotationInstance = new (DecoratorFactory as any)(...args);
    return function TypeDecorator(cls: Type<T>) {
      if (typeFn) typeFn(cls, ...args);
      // Use of Object.defineProperty is important since it creates non-enumerable property which
      // prevents the property is copied during subclassing.
      const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
          (cls as any)[ANNOTATIONS] :
          Object.defineProperty(cls, ANNOTATIONS, {value: []})[ANNOTATIONS];
      annotations.push(annotationInstance);


      if (additionalProcessing) additionalProcessing(cls);

      return cls;
    };
  }

  if (parentClass) {
    DecoratorFactory.prototype = Object.create(parentClass.prototype);
  }

  DecoratorFactory.prototype.ngMetadataName = name;
  (DecoratorFactory as any).annotationCls = DecoratorFactory;
  return DecoratorFactory as any;
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}

export function makeParamDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any): any {
  const metaCtor = makeMetadataCtor(props);
  function ParamDecoratorFactory(...args: any[]): any {
    if (this instanceof ParamDecoratorFactory) {
      metaCtor.apply(this, args);
      return this;
    }
    const annotationInstance = new (<any>ParamDecoratorFactory)(...args);

    (<any>ParamDecorator).annotation = annotationInstance;
    return ParamDecorator;

    function ParamDecorator(cls: any, unusedKey: any, index: number): any {
      // Use of Object.defineProperty is important since it creates non-enumerable property which
      // prevents the property is copied during subclassing.
      const parameters = cls.hasOwnProperty(PARAMETERS) ?
          (cls as any)[PARAMETERS] :
          Object.defineProperty(cls, PARAMETERS, {value: []})[PARAMETERS];

      // there might be gaps if some in between parameters do not have annotations.
      // we pad with nulls.
      while (parameters.length <= index) {
        parameters.push(null);
      }

      (parameters[index] = parameters[index] || []).push(annotationInstance);
      return cls;
    }
  }
  if (parentClass) {
    ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
  }
  ParamDecoratorFactory.prototype.ngMetadataName = name;
  (<any>ParamDecoratorFactory).annotationCls = ParamDecoratorFactory;
  return ParamDecoratorFactory;
}

export function makePropDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (target: any, name: string, ...args: any[]) => void): any {
  const metaCtor = makeMetadataCtor(props);

  function PropDecoratorFactory(...args: any[]): any {
    if (this instanceof PropDecoratorFactory) {
      metaCtor.apply(this, args);
      return this;
    }

    const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

    function PropDecorator(target: any, name: string) {
      const constructor = target.constructor;
      // Use of Object.defineProperty is important since it creates non-enumerable property which
      // prevents the property is copied during subclassing.
      const meta = constructor.hasOwnProperty(PROP_METADATA) ?
          (constructor as any)[PROP_METADATA] :
          Object.defineProperty(constructor, PROP_METADATA, {value: {}})[PROP_METADATA];
      meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
      meta[name].unshift(decoratorInstance);

      if (additionalProcessing) additionalProcessing(target, name, ...args);
    }

    return PropDecorator;
  }

  if (parentClass) {
    PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
  }

  PropDecoratorFactory.prototype.ngMetadataName = name;
  (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
  return PropDecoratorFactory;
}

  /**
   * 获取类元数据
   * 返回结果形如：
   * [
   *   Injectable
   *   NgViewModel
   *   NgViewModel
   * ]
   */
export function getClassMetadatas(constructor: any): any[] {
  const metadatas = constructor[ANNOTATIONS];
  return metadatas;
}


  /**
   * 获取某个class上的某种装饰器
   * 返回结果：NgViewModel
   */
  export function getClassMetadataByName(constructor: any, metadataName: string): any {
    const allClassMetadatas = this.getClassMetadatas(constructor);
    if (!allClassMetadatas) {
      return null;
    }
    const metadata = allClassMetadatas.find((classMetadata: any) => {
      return classMetadata.ngMetadataName === metadataName;
    });
    return metadata;
  }


  // ----------------------------------------
  // 属性元数据
  // ----------------------------------------

  /**
   * 获取所有属性的所有元数据
   * 返回格式：
   * {
   *   propName1: [ NgDefaultValue, NgMaxLength, NgMinLength],
   *   propName2: [ NgDefaultValue, NgMaxLength, NgMinLength]
   * }
   */
  export function getPropsMetadatas(constructor: any): any {
    const allPropMetadatas = constructor[PROP_METADATA];
    return allPropMetadatas;
  }

  /**
   * 获取所有属性的某一类型的元数据
   * 如果同一属性
   * 返回结果：
   * {
   *    propName1: NgDefaultValue,
   *    propName2: NgDefaultValue
   * }
   */
  export function getPropsMetadatasByName(constructor: any, metadataName: string): {[propName: string]: any} {
    const metadatas = {};

    const allPropMetadatas = this.getPropsMetadatas(constructor);
    if (!allPropMetadatas) {
      return metadatas;
    }

    Object.keys(allPropMetadatas).forEach((propName: string) => {
      const propMetadatas: any[] = allPropMetadatas[propName];
      const metadata = propMetadatas.find((propMetadata: any) => {
        return propMetadata.ngMetadataName === metadataName;
      });
      if (metadata) {
        metadatas[propName] = metadata;
      }
    });

    return metadatas;
  }

  /**
   * 获取某个属性的所有元数据
   * 返回格式：[ NgDefaultValue, NgMaxLength, NgMinLength]
   */
  export function getPropMetadatasByName(constructor: any, propName: string): any[] {
    // 暂不实现
    return null;
  }

  /**
   * 获取某个属性的某种元数据
   * 返回格式：NgDefaultValue
   */
  export function getPropMetadataByName(constructor: any, propName: string, metadataName: string): any {
    // 暂不实现
    return null;
  }
