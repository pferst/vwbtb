import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  date: Date;
  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
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
      date: [this.date, Validators.required],
      procStage: [null, Validators.required],
      carType: [null, Validators.required],
      carSide: [null, Validators.required],
      errType: [null, Validators.required],
      injType: [null, Validators.required]
    });
    this.errorsData = errors;
    this.injectionsData = injections;
  }
  clear(){

  }
  today(): void{
    this.date=new Date();
  }
  showButter(){
    
  }
}
