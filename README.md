# Sistema de Venta de Recargas - Angular 22

Este proyecto incluye una interfaz moderna para la venta de recargas móviles desarrollada en **Angular 22** con soporte de estado reactivo mediante **Signals**, además de un servidor de desarrollo basado en **Node.js** para simular la persistencia de datos en un archivo físico.

## 🚀 Instrucciones de Inicio

Para ejecutar y probar la aplicación localmente con el guardado de datos activo, debes inicializar tanto el frontend como el script simulador de backend.

### 1. Iniciar el Servidor de Persistencia (Backend Simulado)
Este script de Node.js se encarga de recibir los datos del formulario y escribirlos físicamente en el archivo `src/app/venta-recargas/venta-recargas.json.ts`.

Abre una terminal en la raíz del proyecto y ejecuta:
```bash
npm install express cors
node guardar.js
```
*Debe aparecer el mensaje: `🚀 Escritor de archivos activo y escuchando en http://localhost:3000`*

### 2. Iniciar la Aplicación de Angular (Frontend)
En una **segunda terminal** (dejando la anterior corriendo en segundo plano), levanta el servidor de desarrollo de Angular:
```bash
ng serve
```
Una vez compilado, abre tu navegador en [http://localhost:4200](http://localhost:4200).

## 📂 Estructura del Archivo de Datos
Cada recarga exitosa procesada en la pantalla se guardará automáticamente con el siguiente formato dentro de `src/app/venta-recargas/venta-recargas.json.ts`:

```typescript
{
  "operador": "Tigo",
  "telefono": "3052611552",
  "valor": 10000,
  "fecha": "10/11/2026, 10:15:48"
}
```
