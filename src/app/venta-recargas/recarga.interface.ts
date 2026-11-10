export interface Operador {
  id: string;
  nombre: string;
}

export interface MontoRecarga {
  valor: number;
  label: string;
}

export interface RegistroRecarga {
  operador: string;
  telefono: string;
  valor: number;
  fecha: string;
}
