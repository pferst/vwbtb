import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BugsRepFormComponent } from '../../component/bugs-rep-form/bugs-rep-form.component';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';
import { MainViewContainer } from '../main-view/main-view.container';

@Component({
  selector: 'app-bugs-rep',
  templateUrl: './bugs-rep.container.html',
  styleUrls: ['./bugs-rep.container.scss'],
  providers: [BugsRepFormComponent, PicViewComponent, StatsComponent, MainViewContainer]
})
export class BugsRepContainer implements OnInit {

  //rootUrl='';
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
  constructor(private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.activetedLink = 0;
  }
  receiveIndex($event)
  {
    this.activetedLink=$event;
  }
}
