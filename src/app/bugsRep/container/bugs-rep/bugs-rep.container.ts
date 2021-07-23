import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BugsRepFormComponent } from '../../component/bugs-rep-form/bugs-rep-form.component';
import { SideFormActionService } from '../../service/side-form-action.service';
import { Subscription } from 'rxjs';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';
import { MainViewContainer } from '../main-view/main-view.container';
import { AuthService } from 'src/app/service/auth.service';
import { ControlService } from 'src/app/service/control.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-bugs-rep',
  templateUrl: './bugs-rep.container.html',
  styleUrls: ['./bugs-rep.container.scss'],
  providers: [BugsRepFormComponent, PicViewComponent, StatsComponent, MainViewContainer]
})
export class BugsRepContainer implements OnInit, OnDestroy {

  //data for open and close form in sidenav
  action: boolean;
  subscription: Subscription;
  //
  navLinks = [
    {
      name: 'Zgłaszanie błędów',
      link: '/',
      index: 0
    },
    {
      name: 'Statystyki',
      link: '/stats',
      index: 1
    }
  ];
  activetedLink: number;
  constructor(private route: ActivatedRoute, 
    public router: Router, 
    private data: SideFormActionService, 
    private auth: AuthService, 
    private changeTab: ControlService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activetedLink = 0;
    this.subscription = this.data.currentAction.subscribe(action => this.action = action);
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  receiveIndex($event)
  {
    if(this.changeTab.changeTabGuard())
    {
      this.activetedLink=$event;
    }
    else{
      this.dialog.open(DialogLogoutComponent);
    }
  }
  closeOrOpenForm($event): void{
    this.data.changeStatus($event);
  }
  logout(){
    this.auth.logout();
  }
}
