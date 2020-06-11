import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiperiodconfigAddOrEditComponent } from './kpiperiodconfig-add-or-edit.component';

describe('KpiperiodconfigAddOrEditComponent', () => {
  let component: KpiperiodconfigAddOrEditComponent;
  let fixture: ComponentFixture<KpiperiodconfigAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiperiodconfigAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiperiodconfigAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
