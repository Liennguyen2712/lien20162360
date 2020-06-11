import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionCatalogAddEditComponent } from './criterion-catalog-add-edit.component';

describe('CriterionCatalogAddEditComponent', () => {
  let component: CriterionCatalogAddEditComponent;
  let fixture: ComponentFixture<CriterionCatalogAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionCatalogAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionCatalogAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
