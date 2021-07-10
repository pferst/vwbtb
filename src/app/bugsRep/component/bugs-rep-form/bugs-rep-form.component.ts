import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bugs-rep-form',
  templateUrl: './bugs-rep-form.component.html',
  styleUrls: ['./bugs-rep-form.component.scss']
})
export class BugsRepFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

}
