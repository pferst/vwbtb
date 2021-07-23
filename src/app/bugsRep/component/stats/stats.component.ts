import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { errors } from '../../4form/errTypes';
import { injections } from '../../4form/errInjection';
import { ErrTypes } from '../../4form/errTypes.interface';
import { Injection } from '../../4form/errInjection.interface';
import { StatsService } from 'src/app/service/stats.service';
import { Subscription } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SideFormActionService } from '../../service/side-form-action.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: [
    './stats.component.scss',
    '../bugs-rep-form/bugs-rep-form.component.scss',
    '../../container/main-view/main-view.container.scss'
  ]
})
export class StatsComponent implements OnInit, OnDestroy {

  //hande form
  
  range: FormGroup;
  partToErr: FormGroup;
  date: Date;
  endDate: Date;
  //
  //Templete 1
  dateToErr: FormGroup;
  errorsData: ErrTypes[];
  injectionsData: Injection[];
  subTemp1: Subscription;
  dataTemp1: any = null;
  //view: any[] = [700, 400];
  selectedErr: string;
  yAxisLabel1: string;
  //
  //Template 2
  range1: FormGroup;
  //
  //data for forms - side
  action: boolean;
  subscription: Subscription;
  formOpened: boolean = true;

  //
  //actions wchih have fluence on form
  @ViewChild('sidenav') sidenav: MatSidenav;
  //
  constructor(
    private fb: FormBuilder, 
    private dateAdapter: DateAdapter<Date>,
    private service: StatsService,
    private data: SideFormActionService) {
    this.dateAdapter.setLocale('pl');
  }

  ngOnInit(): void {
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

    this.range = this.fb.group({
      start: this.date,
      end: this.endDate
    });
    this.range1 = this.fb.group({
      start1: this.date,
      end1: this.endDate
    });
    this.dateToErr = this.fb.group({
      range: this.range,
      errType: [null, Validators.required],
      injType: [null, Validators.required]
    });
    this.partToErr = this.fb.group({
      range: this.range,
      carPart: null,
      errType: null,
      injType: null
    });
    this.errorsData = errors;
    this.injectionsData = injections;
    this.subTemp1 = this.service.dataTemp1$.subscribe(dataTemp1 => this.dataTemp1 = dataTemp1)
    this.subscription = this.data.currentAction.subscribe(action => {
      this.action = action;
      if(this.sidenav)
      {
        this.closeForm();
      }
    });
  }
  ngOnDestroy(){
    this.subTemp1.unsubscribe();
    this.dataTemp1 = null;
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
  }
  today()
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
    this.range.patchValue({
      start: this.date,
      end: this.endDate
    })
  }
  show(template: number){
    switch(template){
      case 1:{
        let formData = this.dateToErr.value;
        formData.range.start.setMilliseconds(0);
        formData.range.start.setSeconds(0);
        formData.range.start.setMinutes(0);
        formData.range.start.setHours(0);
        formData.range.end.setMilliseconds(999);
        formData.range.end.setSeconds(59);
        formData.range.end.setMinutes(59);
        formData.range.end.setHours(23);
        this.yAxisLabel1=this.service.dateToErr(formData);

        break;
      }
      case 2:{
        /*let formData = this..value;
        formData.range.start.setMilliseconds(0);
        formData.range.start.setSeconds(0);
        formData.range.start.setMinutes(0);
        formData.range.start.setHours(0);
        formData.range.end.setMilliseconds(999);
        formData.range.end.setSeconds(59);
        formData.range.end.setMinutes(59);
        formData.range.end.setHours(23);*/
        break;
      }
    }
  }
}
