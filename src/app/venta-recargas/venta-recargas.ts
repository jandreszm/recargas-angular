import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MontoRecarga, Operador } from './recarga.interface';
import { CommonModule } from '@angular/common';
import { VentaRecargasService } from './venta-recargas.service';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-venta-recargas',
  styleUrl: './venta-recargas.css',
  templateUrl: './venta-recargas.html',
})
export class VentaRecargas {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // 1. Inyectamos nuestro servicio simulador
  private recargasService = inject(VentaRecargasService);

  // Catálogos reactivos utilizando Signals
  operadores = signal<Operador[]>([
    { id: 'tigo', nombre: 'Tigo' },
    { id: 'claro', nombre: 'Claro' },
    { id: 'movistar', nombre: 'Movistar' },
    { id: 'wom', nombre: 'Wom' }
  ]);

  montos = signal<MontoRecarga[]>([
    { valor: 10000, label: '$10.000' },
    { valor: 20000, label: '$20.000' },
    { valor: 50000, label: '$50.000' }
  ]);

  // Formulario reactivo clásico
  recargaForm: FormGroup;

  // Signal que monitorea el cambio del valor seleccionado en tiempo real
  valorSeleccionado = signal<number>(10000);

  historial = this.recargasService.obtenerHistorial();

  constructor() {
    this.recargaForm = this.fb.group({
      operador: ['tigo', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      valor: [10000, [Validators.required]]
    });

    this.recargaForm.get('valor')?.valueChanges.subscribe(nuevoValor => {
      this.valorSeleccionado.set(Number(nuevoValor));
    });
  }

  // Método de envío
  procesarRecarga(): void {
    if (this.recargaForm.valid) {
      const payload = this.recargaForm.value;
      console.log('Enviando datos a la API del sistema...', payload);
      const nuevoRegistro = {
        ...this.recargaForm.value,
        fecha: new Date().toLocaleString('es-CO')
      };
      // Aquí invocarías a tu servicio HTTP: this.recargaService.crear(payload).subscribe(...)

      // Enviamos el dato a nuestro script local para que lo guarde en el archivo real
      this.http.post('http://localhost:3000/guardar', nuevoRegistro).subscribe({
        next: () => {
          console.log('¡Guardado físicamente en venta-recargas.json.ts!');
          alert('Recarga agregada directamente al archivo físico.');
          this.recargaForm.reset({ operador: 'Tigo', valor: 10000 });
        },
        error: (err) => console.error('Asegúrate de encender el script de guardado:', err)
      });
    }
  }
}
