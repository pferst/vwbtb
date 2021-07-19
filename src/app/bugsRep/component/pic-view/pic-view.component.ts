import { Component, ViewChild, OnDestroy, OnInit, ElementRef, AfterViewInit, Output, EventEmitter, Renderer2, Input } from '@angular/core';
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
export class PicViewComponent implements OnInit, OnDestroy, AfterViewInit {
  
  //data for picView
  viewForm: Pictures;
  viewSub: Subscription;
  path: string ='';
  //
  @ViewChild('car') imgId: ElementRef;
  @Output() coordinates = new EventEmitter<[ErrCoordinates, {width: number, height: number}]>();
  position: [ErrCoordinates, {width: number, height: number}];
  temp: ErrCoordinates;
  y: number;
  x: number;
  @Input() errArr: any[];

  constructor(private picForm: ShowPicService, private renderer: Renderer2) { }

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
  ngAfterViewInit(): void{
    if(this.path)
    {
      let width = this.imgId.nativeElement.offsetWidth;
      let height = this.imgId.nativeElement.offsetHeight;
      console.log('Width:' + width);
      console.log('Height: ' + height);
    }
  }
  putErrImg(event: MouseEvent)
  {
    //console.log('x offset: ', event.offsetX);
    //console.log('y offset: ', event.offsetY);
    let width: number = this.imgId.nativeElement.offsetWidth;
    let height: number = this.imgId.nativeElement.offsetHeight;
    this.position = [
      {
        x: event.offsetX,
        y: event.offsetY,
      },
      {width: width, height: height}
    ];
    this.temp = {
      x: event.offsetX,
      y: event.offsetY,
    };
    this.y=this.temp.y;
    this.x=this.temp.x;
    //console.log(this.position);
    this.coordinates.emit(this.position);
    const newErr={
      top: this.y,
      left: this.x,
      width: "6px",
      height: "6px"
    };
    const d2 = this.renderer.createElement('img');
    this.renderer.setAttribute(d2, 'src', '../../../../assets/graphics/points/-.jpg');
    this.renderer.setAttribute(d2, 'class', 'points');
    //this.renderer.setAttribute(d2, '[ngStyle]', 'newErr');
    this.renderer.appendChild(this.imgId.nativeElement, d2);
  }
}
