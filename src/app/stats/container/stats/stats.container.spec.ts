import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsContainer } from './stats.container';

describe('StatsContainer', () => {
  let component: StatsContainer;
  let fixture: ComponentFixture<StatsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
