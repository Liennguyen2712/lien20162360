import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrgAddOrEditComponent } from './user-org-add-or-edit.component';

describe('UserOrgAddOrEditComponent', () => {
  let component: UserOrgAddOrEditComponent;
  let fixture: ComponentFixture<UserOrgAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrgAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrgAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
