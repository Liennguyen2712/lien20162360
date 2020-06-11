import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiAddOrEditComponent } from './kpi-add-or-edit.component';

describe('KpiAddOrEditComponent', () => {
  let component: KpiAddOrEditComponent;
  let fixture: ComponentFixture<KpiAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
