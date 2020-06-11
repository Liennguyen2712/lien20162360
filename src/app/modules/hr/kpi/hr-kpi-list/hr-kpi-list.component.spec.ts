import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrKpiListComponent } from './hr-kpi-list.component';

describe('HrKpiListComponent', () => {
  let component: HrKpiListComponent;
  let fixture: ComponentFixture<HrKpiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrKpiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrKpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
