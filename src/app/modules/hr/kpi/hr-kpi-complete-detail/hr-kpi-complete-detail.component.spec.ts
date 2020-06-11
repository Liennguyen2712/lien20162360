import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrKpiCompleteDetailComponent } from './hr-kpi-complete-detail.component';

describe('HrKpiCompleteDetailComponent', () => {
  let component: HrKpiCompleteDetailComponent;
  let fixture: ComponentFixture<HrKpiCompleteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrKpiCompleteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrKpiCompleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
