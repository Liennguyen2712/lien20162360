import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTransferEditComponent } from './emp-transfer-edit.component';

describe('EmpTransferEditComponent', () => {
  let component: EmpTransferEditComponent;
  let fixture: ComponentFixture<EmpTransferEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTransferEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTransferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
