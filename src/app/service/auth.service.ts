import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../login/interface/user';

const currentUser: User = {login: '', password: ''};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.user$.pipe(map(user => !user));
    const user = localStorage.getItem('currentUser'); 

    if(user && user!=undefined)
    {
      this.subject.next(JSON.parse(user));
    }
  }
  logIn(login: string, password: string): boolean
  {
    const user = undefined;
    if(login=='admin' && password=='123456')
    {
      const user = {
        login: login, 
        password: password
      };
      this.subject.next(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
      return true;
    }
    localStorage.setItem('currentUser',JSON.stringify(user));
    return false;
  }

  logout() 
  {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
/*   isAuthenticated(){
    const currUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currUser.login=='admin' && currUser=='123456')
    {
      this.isLoggedIn$ = this.user$.pipe(map(user => true));
    }
    else
    {
      this.isLoggedIn$ = this.user$.pipe(map(user => false));
    }
  } */
}
