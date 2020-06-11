import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventDiaryComponent } from './update-event-diary.component';

describe('UpdateEventDiaryComponent', () => {
  let component: UpdateEventDiaryComponent;
  let fixture: ComponentFixture<UpdateEventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
