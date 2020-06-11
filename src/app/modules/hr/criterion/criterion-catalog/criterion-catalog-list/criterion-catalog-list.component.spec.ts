import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionCatalogListComponent } from './criterion-catalog-list.component';

describe('CriterionCatalogListComponent', () => {
  let component: CriterionCatalogListComponent;
  let fixture: ComponentFixture<CriterionCatalogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionCatalogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionCatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
