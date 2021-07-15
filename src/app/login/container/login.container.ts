import { Component, Directive, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthguardGuard } from 'src/app/guard/authguard.guard';
import { AuthService } from 'src/app/service/auth.service';
import { LoginComponent } from '../component/login.component';
import { User } from '../interface/user';

@Component({
  selector: 'login-container',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss', '../../navbar/navbar.component.scss'],
  viewProviders: [LoginComponent]
})
export class LoginContainer implements OnInit, OnDestroy {

  form: FormGroup;
  user: User;
  subscription: Subscription;
  constructor(private authGuard: AuthService) {
   }

  ngOnInit(): void {
    this.subscription = this.authGuard.user$.subscribe(user => this.user = user);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  receiveForm($event): void{
    this.authGuard.user$=this.authGuard.logIn($event.login, $event.password);
    //console.log($event.login);
  }
}
