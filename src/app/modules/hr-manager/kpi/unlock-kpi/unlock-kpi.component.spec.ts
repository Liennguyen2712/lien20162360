import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockKpiComponent } from './unlock-kpi.component';

describe('UnlockKpiComponent', () => {
  let component: UnlockKpiComponent;
  let fixture: ComponentFixture<UnlockKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
