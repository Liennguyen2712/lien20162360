import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatisticsReportsComponent } from './view-statistics-reports.component';

describe('ViewStatisticsReportsComponent', () => {
  let component: ViewStatisticsReportsComponent;
  let fixture: ComponentFixture<ViewStatisticsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStatisticsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStatisticsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
