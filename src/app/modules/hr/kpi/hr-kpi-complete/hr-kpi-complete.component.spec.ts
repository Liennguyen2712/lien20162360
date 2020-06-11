import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrKpiCompleteComponent } from './hr-kpi-complete.component';

describe('HrKpiCompleteComponent', () => {
  let component: HrKpiCompleteComponent;
  let fixture: ComponentFixture<HrKpiCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrKpiCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrKpiCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
