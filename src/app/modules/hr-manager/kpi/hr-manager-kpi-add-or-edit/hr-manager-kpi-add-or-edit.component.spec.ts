import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrManagerKpiAddOrEditComponent } from './hr-manager-kpi-add-or-edit.component';

describe('HrManagerKpiAddOrEditComponent', () => {
  let component: HrManagerKpiAddOrEditComponent;
  let fixture: ComponentFixture<HrManagerKpiAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrManagerKpiAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrManagerKpiAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
