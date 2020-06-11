import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendSelectComponent } from './extend-select.component';

describe('ExtendSelectComponent', () => {
  let component: ExtendSelectComponent;
  let fixture: ComponentFixture<ExtendSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
