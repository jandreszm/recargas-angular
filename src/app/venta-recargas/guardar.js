const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Buscamos de forma segura la carpeta raíz del proyecto recorriendo hacia atrás
let carpetaRaiz = __dirname;
while (!fs.existsSync(path.join(carpetaRaiz, 'package.json')) && path.dirname(carpetaRaiz) !== carpetaRaiz) {
  carpetaRaiz = path.dirname(carpetaRaiz);
}

// 2. Apuntamos a la ruta exacta del archivo destino
const rutaArchivo = path.join(carpetaRaiz, 'src', 'app', 'venta-recargas', 'venta-recargas.json.ts');

app.post('/guardar', (req, res) => {
  const nuevoDato = req.body;

  try {
    let historial = [];

    // Asegurar que la estructura de carpetas exista antes de escribir
    const carpetaContenedora = path.dirname(rutaArchivo);
    if (!fs.existsSync(carpetaContenedora)) {
      fs.mkdirSync(carpetaContenedora, { recursive: true });
    }

    // Si el archivo ya tiene datos, intentamos extraerlos para no perderlos
    if (fs.existsSync(rutaArchivo)) {
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      const coincidencia = contenido.match(/=\s*(\[[\s\S]*\])/);
      if (coincidencia && coincidencia[1]) {
        try {
          historial = JSON.parse(coincidencia[1]);
        } catch (e) {
          historial = [];
        }
      }
    }

    // Insertamos el nuevo registro al array
    historial.push(nuevoDato);

    // Escribimos físicamente el archivo con formato TypeScript válido
    const textoFinal = `export const HISTORIAL_RECARGAS_JSON = ${JSON.stringify(historial, null, 2)};\n`;
    fs.writeFileSync(rutaArchivo, textoFinal, 'utf8');

    console.log('✅ ¡Registro agregado físicamente en venta-recargas.json.ts!');
    res.status(200).send({ mensaje: 'Guardado correctamente' });
  } catch (error) {
    console.error('❌ Error escribiendo el archivo:', error);
    res.status(500).send('Error interno al escribir el archivo');
  }
});

app.listen(3000, () => {
  console.log('🚀 Escritor de archivos activo y escuchando en http://localhost:3000');
  console.log('Buscando archivo en:', rutaArchivo);
});
