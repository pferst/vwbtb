import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { pictures } from '../component/pic-view/pictures';
import { Pictures } from '../component/pic-view/pictures.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowPicService {

  pics: Pictures[];
  chosen: Pictures = {name:'', side: '', path: ''};
  private butterflySource = new BehaviorSubject<Pictures>(this.chosen);
  private pathFlag: boolean = false;
  butterfly$ = this.butterflySource.asObservable();
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
}
