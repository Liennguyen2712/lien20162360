import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionTypeAddEditComponent } from './criterion-type-add-edit.component';

describe('CriterionTypeAddEditComponent', () => {
  let component: CriterionTypeAddEditComponent;
  let fixture: ComponentFixture<CriterionTypeAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionTypeAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
