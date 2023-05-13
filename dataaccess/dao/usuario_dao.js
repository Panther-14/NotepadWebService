const connection = require('../db_connection');

function registroUsuario(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuario SET ?';

    connection.query(sql, user, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });

    connection.end();
  });
}

function activarUsuario(celular, opt) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuario SET activo = ?, tiempoActivacion = ? WHERE celular = ?';
    const values = [1, new Date().toISOString(), celular];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });

    connection.end();
  });
}

function actualizarUsuario({ idUsuario, nombre, apellidos, contrasena }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET nombres = ?, apellidos = ?, contrasena = ? WHERE idUsuario = ?';
    console.log({ idUsuario, nombre, apellidos, contrasena });
    const values = [nombre, apellidos, contrasena, idUsuario];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });

    connection.end();
  });
}

module.exports = {
  registroUsuario,
  activarUsuario,
  actualizarUsuario,
};