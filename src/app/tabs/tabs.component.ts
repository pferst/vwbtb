import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  links = ['First', 'Second'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
