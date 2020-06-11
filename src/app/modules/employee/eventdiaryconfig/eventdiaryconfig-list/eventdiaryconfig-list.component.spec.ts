import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdiaryconfigListComponent } from './eventdiaryconfig-list.component';

describe('EventdiaryconfigListComponent', () => {
  let component: EventdiaryconfigListComponent;
  let fixture: ComponentFixture<EventdiaryconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdiaryconfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdiaryconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
