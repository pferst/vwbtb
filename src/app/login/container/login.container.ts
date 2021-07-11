import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../component/login.component';

@Component({
  selector: 'login-container',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss', '../../navbar/navbar.component.scss'],
  viewProviders: [LoginComponent]
})
export class LoginContainer implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
    
  }
  onSubmit(): void{
    
  }
}
