import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiEvaluationOrgReportComponent } from './kpi-evaluation-org-report.component';

describe('KpiEvaluationOrgReportComponent', () => {
  let component: KpiEvaluationOrgReportComponent;
  let fixture: ComponentFixture<KpiEvaluationOrgReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiEvaluationOrgReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiEvaluationOrgReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
