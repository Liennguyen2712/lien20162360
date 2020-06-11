import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiaryDetailsComponent } from './user-diary-details.component';

describe('UserDiaryDetailsComponent', () => {
  let component: UserDiaryDetailsComponent;
  let fixture: ComponentFixture<UserDiaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDiaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
