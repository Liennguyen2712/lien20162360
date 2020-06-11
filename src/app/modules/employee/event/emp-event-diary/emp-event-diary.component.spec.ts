import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEventDiaryComponent } from './emp-event-diary.component';

describe('EmpEventDiaryComponent', () => {
  let component: EmpEventDiaryComponent;
  let fixture: ComponentFixture<EmpEventDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpEventDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpEventDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
