import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaClienteComponent } from './carga-cliente.component';

describe('CargaClienteComponent', () => {
  let component: CargaClienteComponent;
  let fixture: ComponentFixture<CargaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
