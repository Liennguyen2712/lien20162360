import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddOrEditComponent } from './user-add-or-edit.component';

describe('UserAddOrEditComponent', () => {
  let component: UserAddOrEditComponent;
  let fixture: ComponentFixture<UserAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
