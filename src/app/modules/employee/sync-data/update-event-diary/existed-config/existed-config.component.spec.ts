import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistedConfigComponent } from './existed-config.component';

describe('ExistedConfigComponent', () => {
  let component: ExistedConfigComponent;
  let fixture: ComponentFixture<ExistedConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistedConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistedConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
