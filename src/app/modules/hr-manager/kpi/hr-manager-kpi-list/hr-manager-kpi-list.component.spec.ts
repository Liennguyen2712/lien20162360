import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrManagerKpiListComponent } from './hr-manager-kpi-list.component';

describe('HrManagerKpiListComponent', () => {
  let component: HrManagerKpiListComponent;
  let fixture: ComponentFixture<HrManagerKpiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrManagerKpiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrManagerKpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
