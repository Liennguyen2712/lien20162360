import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingConfigComponent } from './missing-config.component';

describe('MissingConfigComponent', () => {
  let component: MissingConfigComponent;
  let fixture: ComponentFixture<MissingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
