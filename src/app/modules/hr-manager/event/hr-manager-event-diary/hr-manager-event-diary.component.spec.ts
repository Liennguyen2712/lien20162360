import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrManagerEventDiaryComponent } from './hr-manager-event-diary.component';

describe('HrManagerEventDiaryComponent', () => {
  let component: HrManagerEventDiaryComponent;
  let fixture: ComponentFixture<HrManagerEventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrManagerEventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrManagerEventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
