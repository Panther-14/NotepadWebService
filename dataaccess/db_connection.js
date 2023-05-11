var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'DATABASE',
  user: 'USUARIO',
  password: 'PASSWORD',
});

connection.connect(function(err) {
  if (err) {
    console.error('Error de conexion: ' + err.stack);
    return;
  }
  console.log('Conectado con el identificador ' + connection.threadId);
});

module.exports = connection;