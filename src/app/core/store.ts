import { Injectable } from '@angular/core';

export interface StoreInterface {
    whoami(): void;
}

@Injectable()
export class Store implements StoreInterface {
    whoami(): void {
        console.log('I am store!');
    }
}
