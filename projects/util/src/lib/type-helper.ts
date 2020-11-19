export const TypeHelper={
   isString: (obj: any):boolean=> typeof obj === 'string' || obj instanceof String,
   isBoolean: (obj: any):boolean=> typeof obj === 'boolean' || obj instanceof Boolean ,
   isFunction:(obj: any):boolean=> typeof obj === 'function' || obj instanceof Function,
   isNumber:(obj: any):boolean=> typeof obj === 'number' || obj instanceof Number,
   isArray:(obj: any):boolean=> Object.prototype.toString.call(obj) === "[object Array]",
   isMap:(obj: any):boolean=> Object.prototype.toString.call(obj) === "[object Map]",
   isSet:(obj: any):boolean=> Object.prototype.toString.call(obj) === "[object Set]",
   isDate:(obj: any):boolean=> Object.prototype.toString.call(obj) === "[object Date]",
   isObject:(obj: any):boolean => Object.prototype.toString.call(obj) === "[object object]",
} 