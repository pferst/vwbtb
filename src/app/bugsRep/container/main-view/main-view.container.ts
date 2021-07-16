import { Component, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideFormActionService } from '../../service/side-form-action.service';
import { ShowPicService } from '../../service/show-pic.service';
import { Subscription } from 'rxjs';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';
import { FormGroup } from '@angular/forms';
import { Pictures } from '../../component/pic-view/pictures.interface';
import { pictures } from '../../component/pic-view/pictures';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.container.html',
  styleUrls: ['./main-view.container.scss'],
  providers: [StatsComponent]
})
export class MainViewContainer implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  //data for open and close form in sidenav
  action: boolean;
  subscription: Subscription;
  formOpened: boolean = true;
  //
  //data for picView
  viewForm: Pictures;
  viewSub: Subscription;
  //
  @Output() sideForm = new EventEmitter<HTMLElement>();
  transportViewForm: Pictures;
  constructor(private data: SideFormActionService, private picForm: ShowPicService ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentAction.subscribe(action => {
      this.action = action;
      if(this.sidenav)
      {
        this.closeForm();
      }
    });
    this.viewSub = this.picForm.butterfly$.subscribe(viewForm => this.viewForm = viewForm);
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    this.viewSub.unsubscribe();
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
  showPic($event){
    this.transportViewForm = {name: $event.carType, side: $event.carSide, path: ''};
    this.picForm.showButterPic(this.transportViewForm);
  }
}
