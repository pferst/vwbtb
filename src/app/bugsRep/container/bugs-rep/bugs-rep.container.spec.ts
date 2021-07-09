import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsRepContainer } from './bugs-rep.container';

describe('BugsRepContainer', () => {
  let component: BugsRepContainer;
  let fixture: ComponentFixture<BugsRepContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsRepContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsRepContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
