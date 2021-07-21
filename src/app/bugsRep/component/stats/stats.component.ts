import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: [
    './stats.component.scss',
    '../bugs-rep-form/bugs-rep-form.component.scss',
    '../../container/main-view/main-view.container.scss'
  ]
})
export class StatsComponent implements OnInit {

  //hande form
  form: FormGroup;
  date: Date;

  //
  //data for form
  formOpened: boolean = true;

  //
  //actions wchih have fluence on form
  @ViewChild('sidenav') sidenav: MatSidenav;
  //
  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pl');
    this.date=new Date();
  }

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

}
