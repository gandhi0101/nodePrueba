// Importar las dependencias necesarias
//import {PORT} from '/src/controllers/config.js'
const express = require('express');
const PORT  = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');

// Configurar CORS
const app = express();
app.use(cors());

// Definir rutas y configuraciones adicionales
// ...
const filePath = path.resolve(__dirname, 'models/personas.json');
const fs = require('fs');

app.get('/api/personas', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`este es el error${err}`);
      res.status(500).json({ error: 'Error al leer el archivo personas.json' });
    } else {
      const personas = JSON.parse(data);
      res.json(personas);
    }
  });
});

app.get('/', (req, res) => {
  res.send('<h1>HOla chiqui BBYs</h1>');
})

// Iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT} \n\n\n Hola me encanta esto\n\n\n` );
});