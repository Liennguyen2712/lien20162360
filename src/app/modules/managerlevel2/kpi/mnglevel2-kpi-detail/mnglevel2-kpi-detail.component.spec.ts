import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mnglevel2KpiDetailComponent } from './mnglevel2-kpi-detail.component';

describe('Mnglevel2KpiDetailComponent', () => {
  let component: Mnglevel2KpiDetailComponent;
  let fixture: ComponentFixture<Mnglevel2KpiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mnglevel2KpiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mnglevel2KpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
