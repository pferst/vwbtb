import { Component, OnInit } from '@angular/core';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.container.html',
  styleUrls: ['./main-view.container.scss'],
  providers: [PicViewComponent, StatsComponent]
})
export class MainViewContainer implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
