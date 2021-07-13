import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor() { }
  isLoggedIn(): boolean{
    return false;
  }
  //logIn(login: string, password: string): Observable<
  //{
    
  //}
}
