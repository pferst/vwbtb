import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BugsRepFormComponent } from '../../component/bugs-rep-form/bugs-rep-form.component';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';
import { StatsComponent } from '../../component/stats/stats.component';

@Component({
  selector: 'app-bugs-rep',
  templateUrl: './bugs-rep.container.html',
  styleUrls: ['./bugs-rep.container.scss'],
  providers: [BugsRepFormComponent, PicViewComponent, StatsComponent]
})
export class BugsRepContainer implements OnInit {

  //rootUrl='';
  show=false;
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
  activeLink: number;
  constructor(private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.activeLink = 0;
  }
  receiveIndex($event)
  {
    this.activeLink=$event;
  }
}
