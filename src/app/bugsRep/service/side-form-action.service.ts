import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideFormActionService {

  private action = new BehaviorSubject(false);
  currentAction = this.action.asObservable();
  constructor() { }
  changeStatus(currentAction: boolean)
  {
    this.action.next(currentAction);
  }
}
