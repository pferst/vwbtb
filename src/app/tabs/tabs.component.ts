import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from '../service/control.service';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {

  @Input() links:  Array<any>;
  rootUrl='';
  @Output() tabEvent = new EventEmitter<number>();

  constructor(private route: ActivatedRoute, 
    public router: Router,
    private control: ControlService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void{
  }
  ngOnDestroy(): void{
  }
  changeTab(target: string): string{
    if(this.control.changeTabGuard())
    {
      return target;
    }
    else{
      //this.changeSource.next(true);
      //this.dialog.open(DialogLogoutComponent);
      return this.router.url;
    }
  }
}
