import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdiaryconfigAddOrEditComponent } from './eventdiaryconfig-add-or-edit.component';

describe('EventdiaryconfigAddOrEditComponent', () => {
  let component: EventdiaryconfigAddOrEditComponent;
  let fixture: ComponentFixture<EventdiaryconfigAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdiaryconfigAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdiaryconfigAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
