import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pictures } from './pictures.interface';
import { ShowPicService } from '../../service/show-pic.service';

@Component({
  selector: 'app-pic-view',
  templateUrl: './pic-view.component.html',
  styleUrls: ['./pic-view.component.scss']
})
export class PicViewComponent implements OnInit, OnDestroy {
  
  //data for picView
  viewForm: Pictures;
  viewSub: Subscription;
  path: string ='a';

  //
  
  constructor(private picForm: ShowPicService) { }

  ngOnInit(): void {
    this.viewSub = this.picForm.butterfly$.subscribe(viewForm => {
        if(!!viewForm)
        {
          this.viewForm = viewForm;
          this.path = this.viewForm.path;
        }
        else{
          this.path = '';
        }
      });
  }
  ngOnDestroy(): void{
    this.viewSub.unsubscribe();
  }
}
