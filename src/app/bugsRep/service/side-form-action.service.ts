import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SideFormActionService {

  private action = new BehaviorSubject(false);
  currentAction = this.action.asObservable();
  constructor(private auth: AuthService) { }
  changeStatus(currentAction: boolean)
  {
    if(this.auth.isLoggedIn$)
    {
      this.action.next(currentAction);
    }
  }
}
