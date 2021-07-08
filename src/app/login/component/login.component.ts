import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  //@Output() loginRequest = new EventEmitter<form>();
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  onSubmit(): void{
    //this.loginRequest.emit(this.form);
  }

}
