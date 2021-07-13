import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../component/login.component';

@Component({
  selector: 'login-container',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss', '../../navbar/navbar.component.scss'],
  viewProviders: [LoginComponent]
})
export class LoginContainer implements OnInit {

  form: FormGroup;
  login: string;
  password: string;
  constructor() {
   }

  ngOnInit(): void {
    
  }
  receiveForm($event): void{
    this.form = $event;
    console.log(this.form.get('login').value);
  }
}
