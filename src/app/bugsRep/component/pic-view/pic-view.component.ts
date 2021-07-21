import { Component, ViewChild, OnDestroy, OnInit, ElementRef, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pictures } from './pictures.interface';
import { ShowPicService } from '../../service/show-pic.service';
import { ErrCoordinates } from 'src/app/_data/coordinates.interface';


@Component({
  selector: 'app-pic-view',
  templateUrl: './pic-view.component.html',
  styleUrls: ['./pic-view.component.scss']
})
export class PicViewComponent implements OnInit, OnDestroy {
  
  //data for picView
  viewForm: Pictures;
  viewSub: Subscription;
  path: string ='';
  butterFlagPath: boolean;
  //
  @ViewChild('car') imgId: ElementRef;
  @Output() coordinates = new EventEmitter<[ErrCoordinates, {width: number, height: number}]>();
  position: [ErrCoordinates, {width: number, height: number}];
  temp: ErrCoordinates;
  y: number;
  x: number;
  @Input() errArr: ErrCoordinates[];

  constructor(private picForm: ShowPicService) { }

  ngOnInit(): void {
    this.viewSub = this.picForm.butterfly$.subscribe(viewForm => {
        if(!!viewForm && this.butterFlagPath)
        {
          this.viewForm = viewForm;
          this.path = this.viewForm.path;
        }
        else{
          this.path = '';
        }
      });
    this.butterFlagPath=true;
  }
  ngOnDestroy(): void{
    this.viewSub.unsubscribe();
    this.butterFlagPath=false;
  }
  @HostListener('document:fullscreenchange')
  @HostListener('webkitfullscreenchange')
  @HostListener('mozfullscreenchange')
  @HostListener('MSFullscreenChange')
  @HostListener('window:resize')
  async onResize() {
    await new Promise(f => setTimeout(f, 500));
    if(this.imgId) this.putErrImg();
  }
  putErrImg(event?: MouseEvent)
  {
    //console.log('x offset: ', event.offsetX);
    //console.log('y offset: ', event.offsetY);
    let width: number = this.imgId.nativeElement.offsetWidth;
    let height: number = this.imgId.nativeElement.offsetHeight;
    if(event)
    {
      console.log(event);

      this.position = [
        {
          x: event.offsetX,
          y: event.offsetY,
          path: ''
        },
        {width: width, height: height}
      ];
    }
    else{
      this.position = [
        {
          x: null,
          y: null,
          path: ''
        },
        {width: width, height: height}
      ];
    }
    //console.log(this.position);
    this.coordinates.emit(this.position);
  }
}
