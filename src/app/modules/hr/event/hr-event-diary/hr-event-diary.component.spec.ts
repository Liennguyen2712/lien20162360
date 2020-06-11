import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEventDiaryComponent } from './hr-event-diary.component';

describe('HrEventDiaryComponent', () => {
  let component: HrEventDiaryComponent;
  let fixture: ComponentFixture<HrEventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
