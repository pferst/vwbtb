import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../login/interface/user';

const currentUser = "empty";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.user$.pipe(map(user => !user));

    const user = localStorage.getItem('currentUser'); 

    if(user)
    {
      this.subject.next(JSON.parse(user));
    }
   }
  logIn(login: string, password: string): Observable<User>
  {
      return this.user$.pipe(tap(user =>{
      this.subject.next(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
    }),
      shareReplay()
    );
  }
}
