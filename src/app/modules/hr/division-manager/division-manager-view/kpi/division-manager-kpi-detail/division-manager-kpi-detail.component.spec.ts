import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionManagerKpiDetailComponent } from './division-manager-kpi-detail.component';

describe('DivisionManagerKpiDetailComponent', () => {
  let component: DivisionManagerKpiDetailComponent;
  let fixture: ComponentFixture<DivisionManagerKpiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionManagerKpiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionManagerKpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
