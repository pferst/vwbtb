import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor() { }

  changeTabGuard(): boolean{
    const read = localStorage.getItem('last');
    if(read!=null && read.length>0){
      return false; 
    }
    return true;
  }
}
