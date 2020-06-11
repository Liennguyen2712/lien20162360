import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDiaryComponent } from './event-diary.component';

describe('EventDiaryComponent', () => {
  let component: EventDiaryComponent;
  let fixture: ComponentFixture<EventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
