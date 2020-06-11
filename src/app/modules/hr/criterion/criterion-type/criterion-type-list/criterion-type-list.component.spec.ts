import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionTypeListComponent } from './criterion-type-list.component';

describe('CriterionTypeListComponent', () => {
  let component: CriterionTypeListComponent;
  let fixture: ComponentFixture<CriterionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
