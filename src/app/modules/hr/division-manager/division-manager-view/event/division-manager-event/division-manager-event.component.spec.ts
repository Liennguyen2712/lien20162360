import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionManagerEventComponent } from './division-manager-event.component';

describe('DivisionManagerEventComponent', () => {
  let component: DivisionManagerEventComponent;
  let fixture: ComponentFixture<DivisionManagerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionManagerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionManagerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
