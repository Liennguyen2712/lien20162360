import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrgListComponent } from './user-org-list.component';

describe('UserOrgListComponent', () => {
  let component: UserOrgListComponent;
  let fixture: ComponentFixture<UserOrgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
