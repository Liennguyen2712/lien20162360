import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionManagerPermissionListComponent } from './division-manager-permission-list.component';

describe('DivisionManagerPermissionListComponent', () => {
  let component: DivisionManagerPermissionListComponent;
  let fixture: ComponentFixture<DivisionManagerPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionManagerPermissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionManagerPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
