import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionManagerKpiComponent } from './division-manager-kpi.component';

describe('DivisionManagerKpiComponent', () => {
  let component: DivisionManagerKpiComponent;
  let fixture: ComponentFixture<DivisionManagerKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionManagerKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionManagerKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
