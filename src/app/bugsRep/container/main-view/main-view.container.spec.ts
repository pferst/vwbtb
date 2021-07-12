import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewContainer } from './main-view.container';

describe('MainViewComponent', () => {
  let component: MainViewContainer;
  let fixture: ComponentFixture<MainViewContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
