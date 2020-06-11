import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTransferListComponent } from './emp-transfer-list.component';

describe('EmpTransferListComponent', () => {
  let component: EmpTransferListComponent;
  let fixture: ComponentFixture<EmpTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
