import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { errors } from '../../4form/errTypes';
import { injections } from '../../4form/errInjection';
import { ErrTypes } from '../../4form/errTypes.interface';
import { Injection } from '../../4form/errInjection.interface';
import { DateAdapter } from '@angular/material/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bugs-rep-form',
  templateUrl: './bugs-rep-form.component.html',
  styleUrls: ['./bugs-rep-form.component.scss'],
})
export class BugsRepFormComponent implements OnInit {

  errorsData: ErrTypes[];
  injectionsData: Injection[];
  form: FormGroup;
  @Output() viewButter = new EventEmitter<FormGroup>();
  @Output() saveReport = new EventEmitter<FormGroup>();
  date: Date;
  saved: boolean;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
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
    this.form = this.fb.group({
      id: [null, Validators.required],
      carColor: [null, Validators.required],
      date: [new Date(), Validators.required],
      procStage: [null, Validators.required],
      carType: [null, Validators.required],
      carSide: [null, Validators.required],
      carPart: [null, Validators.required],
      errType: [null, Validators.required],
      injType: [null, Validators.required]
    });
    this.errorsData = errors;
    this.injectionsData = injections;
  }
  clear(){
    this.form.reset();
    this.today();
    this.showButter();

  }
  today(): void{
    this.date=new Date();
    this.form.patchValue({
      date: this.date
   });
  }
  showButter(){
    if(this.form.value.errType!='wtrącenia' && this.form.value.errType!=null)
    {
      this.form.patchValue({
        injType: '-'
     });
    }
    this.viewButter.emit(this.form.value);
  }
  save(){
    if(this.form.value.errType!='wtrącenia')
    {
      this.form.value.injType = '-';
    }
    this.saveReport.emit(this.form.value);
    this.clear();
  }
}
