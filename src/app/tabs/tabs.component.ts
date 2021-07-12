import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() links:  Array<any>;
  rootUrl='';
  @Output() tabEvent = new EventEmitter<number>();

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void{
  }
  changeTab(index: number){
    this.tabEvent.emit(index);
  }

}
