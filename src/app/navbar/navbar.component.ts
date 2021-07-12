import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  viewProviders: [TabsComponent]
})
export class NavbarComponent implements OnInit {

  @Input() links: Array<any>;
  index: number;
  @Output() tabChanging = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  transferToContainer($event)
  {
    this.index=$event;
    this.tabChanging.emit(this.index);
  }

}
