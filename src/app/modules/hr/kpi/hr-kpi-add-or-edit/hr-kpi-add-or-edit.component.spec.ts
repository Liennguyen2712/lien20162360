import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrKpiAddOrEditComponent } from './hr-kpi-add-or-edit.component';

describe('HrKpiAddOrEditComponent', () => {
  let component: HrKpiAddOrEditComponent;
  let fixture: ComponentFixture<HrKpiAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrKpiAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrKpiAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
