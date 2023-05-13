const connection = require('../db_connection');

function accederUsuario(username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT celular, contrasena FROM usuarios WHERE celular = ? AND contrasena = ?';
    const values = [username, password];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function registroUsuario(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios SET ?';

    connection.query(sql, user, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function activarUsuario(celular, otp) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET activo = ?, otp = ?, tiempoActivacion = ? WHERE celular = ?';
    const values = [1, otp, new Date().toISOString().slice(0, 19).replace('T', ' '), celular];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function actualizarUsuario({ idUsuario, nombre, apellidos, contrasena }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET nombres = ?, apellidos = ?, contrasena = ? WHERE idUsuario = ?';
    const values = [nombre, apellidos, contrasena, idUsuario];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  accederUsuario,
  registroUsuario,
  activarUsuario,
  actualizarUsuario,
};