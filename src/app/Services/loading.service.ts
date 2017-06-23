import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

     public  Loading = new EventEmitter<Object>();

     getLoading(t)
     {
         this.Loading.emit(t);
     }
}