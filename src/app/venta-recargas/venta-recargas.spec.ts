import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaRecargas } from './venta-recargas';

describe('VentaRecargas', () => {
  let component: VentaRecargas;
  let fixture: ComponentFixture<VentaRecargas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaRecargas],
    }).compileComponents();

    fixture = TestBed.createComponent(VentaRecargas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
