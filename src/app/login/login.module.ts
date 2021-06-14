import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { LoginContainer } from './container/login.container';


@NgModule({
  declarations: [
    LoginContainer,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
