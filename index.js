const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config()

// Settings
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ['Overlord'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['*'],
};

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(bodyParser.json());
app.set('json spaces', 2);

// CORS
app.use(cors(corsOptions));

// Rutas - WEB Page
app.use(express.static('./web/src'));
app.use(require('./web/web_page.js'));

// Rutas - Basic Auth
app.use('/basic/acceso', require('./ws/acceso_ws.js'));

// Rutas - Token Auth
app.use('/auth/usuario', require('./ws/usuario_ws.js'));
app.use('/auth/libreta', require('./ws/libreta_ws.js'));

// Endpoint WildCard
app.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE EL RECURSO SOLICITADO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
/*
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado en http://0.0.0.0:${PORT}`);
});
*/