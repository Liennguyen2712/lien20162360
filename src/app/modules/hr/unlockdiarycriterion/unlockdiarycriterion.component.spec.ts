import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockdiarycriterionComponent } from './unlockdiarycriterion.component';

describe('UnlockdiarycriterionComponent', () => {
  let component: UnlockdiarycriterionComponent;
  let fixture: ComponentFixture<UnlockdiarycriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockdiarycriterionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockdiarycriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
