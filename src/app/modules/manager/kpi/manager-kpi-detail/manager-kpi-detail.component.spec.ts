import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerKpiDetailComponent } from './manager-kpi-detail.component';

describe('ManagerKpiDetailComponent', () => {
  let component: ManagerKpiDetailComponent;
  let fixture: ComponentFixture<ManagerKpiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerKpiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerKpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
