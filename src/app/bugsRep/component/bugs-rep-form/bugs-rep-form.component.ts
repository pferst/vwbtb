import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { errors } from '../../4form/errTypes';
import { injections } from '../../4form/errInjection';
import { ErrTypes } from '../../4form/errTypes.interface';
import { Injection } from '../../4form/errInjection.interface';

@Component({
  selector: 'app-bugs-rep-form',
  templateUrl: './bugs-rep-form.component.html',
  styleUrls: ['./bugs-rep-form.component.scss']
})
export class BugsRepFormComponent implements OnInit {

  errorsData: ErrTypes[];
  injectionsData: Injection[];
  form: FormGroup;
  selectedError = '';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, Validators.required],
      errType: [this.selectedError, Validators.required]
    });
    this.errorsData = errors;
    this.injectionsData = injections;
  }
  clear(){

  }

}
