import { Component, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideFormActionService } from '../../service/side-form-action.service';
import { Subscription } from 'rxjs';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.container.html',
  styleUrls: ['./main-view.container.scss'],
  providers: [PicViewComponent, StatsComponent]
})
export class MainViewContainer implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  //data for open and close form in sidenav
  action: boolean;
  subscription: Subscription;
  formOpened: boolean = true;
  //sidenav: MatSidenav;
  //
  @Output() sideForm = new EventEmitter<HTMLElement>();
  constructor(private data: SideFormActionService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentAction.subscribe(action => {
      this.action = action;
      if(this.sidenav)
      {
        this.closeForm();
      }
    });
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  closeForm()
  {
    this.sidenav.toggle();
    if(this.formOpened)
    {
      this.formOpened=false;
    }
    else
    {
      this.formOpened=true;
    }
  }
}
