import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wave1Component } from './wave1.component';

describe('Wave1Component', () => {
  let component: Wave1Component;
  let fixture: ComponentFixture<Wave1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wave1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wave1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
