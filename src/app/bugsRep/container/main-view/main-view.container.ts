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
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.container.html',
  styleUrls: ['./main-view.container.scss'],
  providers: [StatsComponent]
})
export class MainViewContainer implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('view') picView: PicViewComponent;
  //data for open and close form in sidenav
  action: boolean;
  subscription: Subscription;
  formOpened: boolean = true;
  //
  //data for picView
  viewForm: Pictures;
  viewSub: Subscription;
  //
  //data for errors on butterflies
  errPosSubsrciption$: Subscription;
  errPos: ErrCoordinates[];
  //
  //Data form snack bar
  snackRefSub: Subscription;
  //
  @Output() sideForm = new EventEmitter<HTMLElement>();
  transportViewForm: FormGroup;
  constructor(private data: SideFormActionService, private picForm: ShowPicService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscription = this.data.currentAction.subscribe(action => {
      this.action = action;
      if(this.sidenav)
      {
        this.closeForm();
      }
    });
    this.viewSub = this.picForm.butterfly$.subscribe(viewForm => this.viewForm = viewForm);
    this.errPosSubsrciption$ = this.picForm.errPos$.subscribe(errPos => this.errPos = errPos);
    this.snackRefSub = this.picForm.snackBar$.subscribe(saveStatus => {
      if(saveStatus)
      {
        this.openSuccessSnackBar()
      }
    });
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    this.viewSub.unsubscribe();
    this.errPosSubsrciption$.unsubscribe();
    this.snackRefSub.unsubscribe();
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
    this.picView.onResize();
  }
  showPic($event){
    this.transportViewForm = $event;
    this.picForm.showButterPic(this.transportViewForm);
  }
  saveReport($event){
    this.transportViewForm = $event;
    this.picForm.saveReport(this.transportViewForm);
  }
  errPosition($event){
    this.picForm.insertError($event);
  }
  removeLastItem($event){
    this.picForm.removeLastItem($event);
  }
  openSuccessSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'center',
      panelClass: ['green-snackbar']
    });
  }
}
