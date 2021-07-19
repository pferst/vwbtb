import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { pictures } from '../component/pic-view/pictures';
import { Pictures } from '../component/pic-view/pictures.interface';
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowPicService {

  pics: Pictures[];
  chosen: Pictures = {name:'', side: '', path: ''};
  private butterflySource = new BehaviorSubject<Pictures>(this.chosen);
  private pathFlag: boolean = false;
  butterfly$ = this.butterflySource.asObservable();

  private errPositionSource = new BehaviorSubject<ErrCoordinates[]>(null);
  errPos$ = this.errPositionSource.asObservable();
  constructor() { }

  showButterPic(viewForm: Pictures)
  {
    this.pathFlag=false;
    for(let i=0;i<pictures.length;i++)
    {
      if(pictures[i].name==viewForm.name && viewForm.side==pictures[i].side)
      {
        this.chosen.path=pictures[i].path;
        this.pathFlag=true;
        break;
      }
    }
    if(!this.pathFlag)
    {
      this.chosen.path='';
    }
    this.butterflySource.next(this.chosen);
  }
  insertError(errPos: [ErrCoordinates, {width: number, height: number}]){
    //last = localStorage.getItem('last');
  }
}
