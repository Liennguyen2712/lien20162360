import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiperiodconfigListComponent } from './kpiperiodconfig-list.component';

describe('KpiperiodconfigListComponent', () => {
  let component: KpiperiodconfigListComponent;
  let fixture: ComponentFixture<KpiperiodconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiperiodconfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiperiodconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
