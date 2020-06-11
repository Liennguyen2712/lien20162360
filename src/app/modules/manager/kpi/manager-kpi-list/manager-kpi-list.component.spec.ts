import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerKpiListComponent } from './manager-kpi-list.component';

describe('ManagerKpiListComponent', () => {
  let component: ManagerKpiListComponent;
  let fixture: ComponentFixture<ManagerKpiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerKpiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerKpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
