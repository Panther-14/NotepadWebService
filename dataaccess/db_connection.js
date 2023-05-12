var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PSSWRD,
});

connection.connect(function(err) {
  if (err) {
    console.error('Error de conexion: ' + err.stack);
    return;
  }
  console.log('Conectado con el identificador ' + connection.threadId);
});

module.exports = connection;