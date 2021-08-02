import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { errors } from '../../4form/errTypes';
import { injections } from '../../4form/errInjection';
import { ErrTypes } from '../../4form/errTypes.interface';
import { Injection } from '../../4form/errInjection.interface';
import { DateAdapter } from '@angular/material/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ShowPicService } from '../../service/show-pic.service';
import { Pictures } from '../pic-view/pictures.interface';
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';
import { SideFormActionService } from '../../service/side-form-action.service';
import { StatsService } from 'src/app/service/stats.service';
import { pictures } from '../pic-view/pictures';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {

  //handle form
  range: FormGroup;
  date: Date;
  endDate: Date;
  
  pins: any;
  //data for open and close form in sidenav
  action: boolean;
  subscription: Subscription;
  formOpened: boolean = true;
  //
  path: string ='';
  isMobile: boolean = false;
  errorsData: ErrTypes[];
  injectionsData: Injection[];
  form: FormGroup;
  carID: FormGroup;
  @Output() viewButter = new EventEmitter<FormGroup>();
  @Output() saveReport = new EventEmitter<FormGroup>();
  saved: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('car') imgId: ElementRef;
  viewForm: Pictures;
  viewSub: Subscription;
  butterFlagPath: boolean;
  @Input() errArr: ErrCoordinates[];
  impReports: any = null;
  imgPath: string = '';
  points:any = null;



  @HostListener('document:fullscreenchange')
  @HostListener('webkitfullscreenchange')
  @HostListener('mozfullscreenchange')
  @HostListener('MSFullscreenChange')
  @HostListener('window:resize')
  async onResize() {
    //await new Promise(f => setTimeout(f, 500));
    if(window.visualViewport.width < 756) this.isMobile = true;
    else this.isMobile = false;
    await new Promise(f => setTimeout(f, 500));
    if(this.imgId) this.show();
  }
  
  constructor(private fb: FormBuilder, 
    private dateAdapter: DateAdapter<Date>,
    private picForm: ShowPicService,
    private data: SideFormActionService,
    private stats: StatsService) {
    this.dateAdapter.setLocale('pl');
    this.date=new Date();
   }
/*
  Reports form interface:   
  id: string,
   date: Date,
   procStage: string,
   carType: string,
   carSide: string,
   errType: string,
   errInclusion: string,
   errCoordinates: Array<number> */
  ngOnInit(): void {
    this.pins = null;
    this.date=new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    this.endDate = new Date();
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    this.endDate.setMilliseconds(59);
    console.log("ngOnInit: ", this.date);
    this.range = this.fb.group({
      start: [this.date, Validators.required],
      end: [this.endDate, Validators.required]
    });
    this.form = this.fb.group({
      procStage: [null, Validators.required],
      range: this.range,
      carColor: [null, Validators.required],
      carType: [null, Validators.required],
      carSide: [null, Validators.required]
    });
    this.carID = this.fb.group({
      id: [null, Validators.required]
    });
    this.errorsData = errors;
    this.injectionsData = injections;
    this.viewSub = this.picForm.butterfly$.subscribe(viewForm => {
      if(!!viewForm && this.butterFlagPath)
      {
        this.viewForm = viewForm;
        this.path = this.viewForm.path;
      }
      else{
        this.path = '';
      }
    });
    this.subscription = this.data.currentAction.subscribe(action => {
      this.action = action;
      if(this.sidenav)
      {
        this.closeForm();
      }
    });
  this.butterFlagPath=true;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  clear(){
    this.form.reset();
    this.today(this.range);
    this.imgPath = '';
  }
  today(chosen: any)
  {
    this.date=new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    this.endDate =new Date();
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    this.endDate.setMilliseconds(999);
    chosen.patchValue({
      start: this.date,
      end: this.endDate
    })
  }
  show(){
    const data = this.impReports.filter(item =>{
      return item.id == this.carID.value.id;
    });
    console.log(data);
    for(let i=0;i<pictures.length;i++)
    {
      if(pictures[i].name==data[0].carType && data[0].carSide==pictures[i].side)
      {
        this.imgPath=pictures[i].path;
        break;
      }
    }
    if(this.imgId)
    {
    let currentPositions: ErrCoordinates[] = [];
    let width: number = this.imgId.nativeElement.offsetWidth;
    let height: number = this.imgId.nativeElement.offsetHeight;
    for(let i = 0; i < data.length; i++)
    {
      console.log(data[i]);
      const x = data[i].errCoordinates.x*width/1320-(2*width)/1320;
      const y = data[i].errCoordinates.y*height/900+35-(2*height)/900;//why that 35 px have to be added
      //size of point
      const psx = 12*width/1320;
      const psy = 12*height/900;
      const curr: ErrCoordinates = {
        x: x, 
        y: y, 
        path: this.findErrPath(data[i]), 
        pointSizeX: psx, 
        pointSizeY: psy
      };
      currentPositions.push(curr);
    }
      this.points = currentPositions; 
    }
  }
  findErrPath(form: any): string{
    let path;
    if(form.errType=='wtrącenia'){
      path = errors[0].path
      for(let i = 0; i < injections.length; i++)
      {
        if(form.injType==injections[i].name)
        {
          path+=injections[i].path;
        }
      }
      return path;
    }
    for(let i = 0; i < errors.length; i++)
    {
      if(form.errType == errors[i].name)
      {
        path = errors[i].path;
      }
    }
    return path;
  }
  search(){         
    this.form.value.range.start.setMilliseconds(0);
    this.form.value.range.start.setSeconds(0);
    this.form.value.range.start.setMinutes(0);
    this.form.value.range.start.setHours(0);
    this.form.value.range.end.setMilliseconds(999);
    this.form.value.range.end.setSeconds(59);
    this.form.value.range.end.setMinutes(59);
    this.form.value.range.end.setHours(23);
    const data = this.stats.getDataInTime(this.form.value.range.start, this.form.value.range.end);
    if(data && data.length>0)
    {
      const filtered = data.filter(item =>{
        return item.procStage == this.form.value.procStage &&
        item.carColor == this.form.value.carColor &&
        item.carType == this.form.value.carType &&
        item.carSide == this.form.value.carSide;
      });
      this.impReports = filtered;
      this.pins = [...new Set(filtered.map(item => item.id))];
    }
    else
    {
      this.pins = null;
    }

  }
  closeForm()
  {
    this.sidenav.toggle();
    if(this.formOpened)
    {
      this.formOpened=false;
    }
    else
    {
      this.formOpened=true;
    }
    this.onResize();
  }
}
