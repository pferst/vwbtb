import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsRepFormComponent } from './bugs-rep-form.component';

describe('BugsRepFormComponent', () => {
  let component: BugsRepFormComponent;
  let fixture: ComponentFixture<BugsRepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsRepFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsRepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
