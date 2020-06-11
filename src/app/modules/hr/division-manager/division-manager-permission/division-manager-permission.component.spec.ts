import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionManagerPermissionComponent } from './division-manager-permission.component';

describe('DivisionManagerPermissionComponent', () => {
  let component: DivisionManagerPermissionComponent;
  let fixture: ComponentFixture<DivisionManagerPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionManagerPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionManagerPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
