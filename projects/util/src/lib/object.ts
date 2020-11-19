// import * as _ from 'lodash';
export function deepClone(obj:any){
    // return _.cloneDeep(obj);
    return JSON.parse(JSON.stringify(obj));
  }
