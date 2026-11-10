// src/app/venta-recargas/venta-recargas.service.ts
import { Injectable, signal } from '@angular/core';
import { RegistroRecarga } from './recarga.interface';
import { HISTORIAL_RECARGAS_JSON } from './venta-recargas.json';

@Injectable({
  providedIn: 'root'
})
export class VentaRecargasService {
  // Inicializamos un Signal con los datos importados del archivo .ts
  private registros = signal<RegistroRecarga[]>([...HISTORIAL_RECARGAS_JSON]);

  // Exponemos el estado de forma pública para lectura
  obtenerHistorial() {
    return this.registros.asReadonly();
  }

  // Simula la acción de escribir/guardar en el archivo JSON
  guardarRecarga(nuevaRecarga: Omit<RegistroRecarga, 'fecha'>): void {
    const registroCompleto: RegistroRecarga = {
      ...nuevaRecarga,
      fecha: new Date().toLocaleString('es-CO')
    };

    // Agrega el nuevo elemento al array simulado en memoria
    this.registros.update(actuales => [...actuales, registroCompleto]);

    console.log('--- ARCHIVO SIMULADO ACTUALIZADO ---');
    console.log(JSON.stringify(this.registros(), null, 2));
  }
}
