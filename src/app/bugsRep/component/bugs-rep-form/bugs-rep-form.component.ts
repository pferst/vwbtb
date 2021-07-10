import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bugs-rep-form',
  templateUrl: './bugs-rep-form.component.html',
  styleUrls: ['./bugs-rep-form.component.scss']
})
export class BugsRepFormComponent implements OnInit {

  form: FormGroup;
  mode = new FormControl('push');
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, Validators.required]
    })
  }

}
