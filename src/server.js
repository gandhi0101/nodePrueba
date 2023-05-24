// Importar las dependencias necesarias
const http = require('http');
const app = require('./app'); // Ruta al archivo app.js

// Crear el servidor
const server = http.createServer(app);

// Configurar el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});