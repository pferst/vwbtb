import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
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

  isMobile: boolean = false;
  @Input() links:  Array<any>;
  rootUrl='';
  @Output() tabEvent = new EventEmitter<number>();

  @HostListener('document:fullscreenchange')
  @HostListener('webkitfullscreenchange')
  @HostListener('mozfullscreenchange')
  @HostListener('MSFullscreenChange')
  @HostListener('window:resize')
  async onResize() {
    //await new Promise(f => setTimeout(f, 500));
    if(window.visualViewport.width < 665) this.isMobile = true;
    else this.isMobile = false;
  }
  
  constructor(private route: ActivatedRoute, 
    public router: Router,
    private control: ControlService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void{
    this.onResize();
  }
  ngOnDestroy(): void{
  }
  changeTab(target: string): string{
    if(target != '/')
    {
      localStorage.removeItem('last');
    }
    return target;
  }
}
