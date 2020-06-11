import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAddEditComponent } from './org-add-edit.component';

describe('OrgAddEditComponent', () => {
  let component: OrgAddEditComponent;
  let fixture: ComponentFixture<OrgAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
