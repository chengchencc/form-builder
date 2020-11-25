import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Injectable, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxMonacoEditorConfig } from './config';

let loadedMonaco = false;
let loadPromise: Promise<void>;
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class EditorService {


  constructor() { }

  init(config: NgxMonacoEditorConfig) {

    if (loadedMonaco) {
      // Wait until monaco editor is available
      // loadPromise.then(() => {
      //   this.initMonaco(this._options);
      // });

      return loadPromise;

    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = config.baseUrl || './assets';
        if (typeof ((window as any).monaco) === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (window as any).require.config({ paths: { vs: `${baseUrl}/monaco/vs` } });
          (window as any).require(['vs/editor/editor.main'], () => {
            if (typeof config.onMonacoLoad === 'function') {
              config.onMonacoLoad();
            }
            // this.initMonaco(this._options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(window as any).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
      return loadPromise;
    }
  }

}
