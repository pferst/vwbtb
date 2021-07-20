import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { pictures } from '../component/pic-view/pictures';
import { Pictures } from '../component/pic-view/pictures.interface';
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';
import { last } from 'rxjs/operators';

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
    
    const read = localStorage.getItem('last');
    let last : ErrCoordinates[] = [];
    if(read){
      last = JSON.parse(read);
    }
    let currentPositions: ErrCoordinates[] = [];
    if(errPos[0].x)
    {
      const x = errPos[0].x*1320/errPos[1].width;
      const y = errPos[0].y*900/errPos[1].height;
      const saved: ErrCoordinates = {x: x, y: y};
      last.push(saved);
    }
    for(let i = 0; i < last.length; i++)
    {
      const x = last[i].x*errPos[1].width/1320-(2*errPos[1].width)/1320;
      const y = last[i].y*errPos[1].height/900+35-(2*errPos[1].height)/900;
      //size of point
      const psx = 6*errPos[1].width/1320;
      const psy = 6*errPos[1].height/900;
      const curr: ErrCoordinates = {x: x, y: y, pointSizeX: psx, pointSizeY: psy};
      currentPositions.push(curr);
    }
    this.errPositionSource.next(currentPositions);
    localStorage.setItem('last', JSON.stringify(last));
  }
}
