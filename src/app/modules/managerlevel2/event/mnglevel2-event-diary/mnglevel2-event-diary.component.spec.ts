import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mnglevel2EventDiaryComponent } from './mnglevel2-event-diary.component';

describe('Mnglevel2EventDiaryComponent', () => {
  let component: Mnglevel2EventDiaryComponent;
  let fixture: ComponentFixture<Mnglevel2EventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mnglevel2EventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mnglevel2EventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
