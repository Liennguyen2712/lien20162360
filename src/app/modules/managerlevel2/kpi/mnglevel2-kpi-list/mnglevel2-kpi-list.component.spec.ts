import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mnglevel2KpiListComponent } from './mnglevel2-kpi-list.component';

describe('Mnglevel2KpiListComponent', () => {
  let component: Mnglevel2KpiListComponent;
  let fixture: ComponentFixture<Mnglevel2KpiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mnglevel2KpiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mnglevel2KpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
