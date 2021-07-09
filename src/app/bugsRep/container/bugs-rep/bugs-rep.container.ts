import { Component, OnInit } from '@angular/core';
import { BugsRepFormComponent } from '../../component/bugs-rep-form/bugs-rep-form.component';
import { PicViewComponent } from '../../component/pic-view/pic-view.component';

@Component({
  selector: 'app-bugs-rep',
  templateUrl: './bugs-rep.container.html',
  styleUrls: ['./bugs-rep.container.scss'],
  providers: [BugsRepFormComponent, PicViewComponent]
})
export class BugsRepContainer implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
