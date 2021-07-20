import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { pictures } from '../component/pic-view/pictures';
import { Pictures } from '../component/pic-view/pictures.interface';
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';
import { errors } from '../4form/errTypes';
import { injections  } from '../4form/errInjection';
import { Report } from 'src/app/_data/report.interface';

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

  errPath: string = '';
  injType: string = '-';
  errType: string = '';
  //previous form
  prevForm: any;

  constructor() { }

  showButterPic(viewForm: any)
  {
    this.pathFlag=false;
    for(let i=0;i<pictures.length;i++)
    {
      if(pictures[i].name==viewForm.carType && viewForm.carSide==pictures[i].side)
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
    //only to set the error or/and injection path
    this.errPath='';
    if(viewForm.errType==='wtrącenia')
    {
      this.errType='wtrącenia';
      this.errPath=errors[0].path;
      for(let i = 0; i < injections.length; i++)
      {
        if(injections[i].name == viewForm.injType)
        {
          this.injType=injections[i].name;
          this.errPath+=injections[i].path;
          break;
        }
      }
    }
    else
    {
      this.injType='-';
      for(let i = 0; i < errors.length; i++)
      {
        if(errors[i].name == viewForm.errType)
        {
          this.errType=errors[i].name;
          this.errPath=errors[i].path;
          break;
        }
      }
    }
    if(this.prevForm)
    {
      if(this.prevForm.id!=viewForm.id || this.prevForm.carColor!=viewForm.carColor || this.prevForm.date!=viewForm.date || this.prevForm.procStage!=viewForm.procStage || this.prevForm.carType!=viewForm.carType || this.prevForm.carSide!=viewForm.carSide)
      {
        this.saveReport(this.prevForm);
      }
    }
  }
  saveReport(formVals: any)
  {
    const read = localStorage.getItem('last');
    const reported = localStorage.getItem('Reports');
    let last : ErrCoordinates[] = [];
    if(read){
      last = JSON.parse(read);
      localStorage.removeItem('last');
    }
    let reports: Report[] = [];
    if(reported){
      reports = JSON.parse(reported);
    }
    let newReport: Report;
    newReport.id = formVals.id;
    newReport.carColor=formVals.carColor;
    newReport.date=formVals.date;
    newReport.procStage=formVals.procStage;
    newReport.carType=formVals.carType;
    newReport.carSide=formVals.carSide;
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
      const saved: ErrCoordinates = {
        errType: this.errType, 
        injType: this.injType, 
        x: x, 
        y: y, 
        path: this.errPath
      };
      last.push(saved);
    }
    for(let i = 0; i < last.length; i++)
    {
      const x = last[i].x*errPos[1].width/1320-(2*errPos[1].width)/1320;
      const y = last[i].y*errPos[1].height/900+35-(2*errPos[1].height)/900;
      //size of point
      const psx = 6*errPos[1].width/1320;
      const psy = 6*errPos[1].height/900;
      const curr: ErrCoordinates = {x: x, y: y, path: last[i].path, pointSizeX: psx, pointSizeY: psy};
      currentPositions.push(curr);
    }
    this.errPositionSource.next(currentPositions);
    localStorage.setItem('last', JSON.stringify(last));
  }
  recognizePart(position: Array<any>, carType: string, carSide): string{
    const type = carType.toLowerCase();
    let answer='';
    if(carSide=='wew')
    {
      switch(type){
        case 'doka': {
          /*part list
          1. maska
          2. Prawy bok
          3. lewy bok
          4. podłoga
          5. dach
          6. klapka wlewu
          7. tylna ścianka
          8. drzwi przednie prawe
          9. drzwi przednie lewe
          10. drzwi prawe
          11. drzwi lewe
          */
          if(position[0]>=0 && position[0]<=183 && position[1]>=270 && position[1]<=628)
          {
            answer='maska';

          }else if(position[0]>=207 && position[0]<=646 && position[1]>=0 && position[1]<=300)
          {
            answer = 'prawy bok';

          }else if(position[0]>=207 && position[0]<=646 && position[1]>=591 && position[1]<=900)
          {
            answer = 'lewy bok';

          }else if(position[0]>=207 && position[0]<=646 && position[1]>300 && position[1]<591)
          {
            answer = 'podłoga';

          }else if(position[0]>646 && position[0]<=948 && position[1]>300 && position[1]<591)
          {
            answer = 'dach';
          }
          break;
        }
        case 'kombi': {
          /*part list
          
          */
          break;
        }
        case 'kasten': {
          /*part list
          
          */
          break;
        }
      }
    }
    else{
      switch(type){
        case 'doka': {
          /*part list
          1. maska
          2. Prawy bok
          3. podłoga góra
          5. klapka wlewu
          4. lewy bok
          6. tylna ścianka
          7. drzwi przednie prawe
          8. drzwi przednie lewe
          9. drzwi prawe
          10. drzwi lewe
          */
          
          break;
        }
        case 'kombi': {
          /*part list
          
          */
          break;
        }
        case 'kasten': {
          /*part list
          
          */
          break;
        }
      }
    }
    return answer;
  }
}
