import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.container.html',
  styleUrls: ['./main-view.container.scss'],
  providers: [PicViewComponent, StatsComponent]
})
export class MainViewContainer implements OnInit {

  @Output() sideForm = new EventEmitter<MatSidenav>();
  constructor() { }

  ngOnInit(): void {
  }
  closeForm(sidenav: MatSidenav)
  {
    sidenav.toggle();
  }
}
