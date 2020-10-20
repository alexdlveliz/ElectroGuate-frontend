import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecCategoriasComponent } from './sec-categorias.component';

describe('SecCategoriasComponent', () => {
  let component: SecCategoriasComponent;
  let fixture: ComponentFixture<SecCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
