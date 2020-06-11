import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiaryDialogComponent } from './add-diary-dialog.component';

describe('AddDiaryDialogComponent', () => {
  let component: AddDiaryDialogComponent;
  let fixture: ComponentFixture<AddDiaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
