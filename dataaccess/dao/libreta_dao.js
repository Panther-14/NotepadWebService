const connection = require('../db_connection');

function obtenerLibretasUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM libretas WHERE idUsuario = ?';

    connection.query(sql, idUsuario, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });

    connection.end();
  });
}

function registrarLibretaUsuario({ nombre, colorHexadecimal, idUsuario }) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO libretas (nombre, colorHexadecimal,idUsuario) VALUES(?,?,?)';
    const values = [nombre, colorHexadecimal, idUsuario];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });

    connection.end();
  });
}

function actualizarLibretaUsuario({ nombre, colorHexadecimal, idLibreta, idUsuario }) {
  return new Promise((resolve, reject) => {
    const sql = '';
    const values = [nombre, colorHexadecimal, idLibreta, idUsuario];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });

    connection.end();
  });
}

function eliminarLibretaUsuario({ idLibreta, idUsuario }) {
  return new Promise((resolve, reject) => {
    const sql = '';
    const values = [idLibreta, idUsuario];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });

    connection.end();
  });
}

module.exports = {
  obtenerLibretasUsuario,
  registrarLibretaUsuario,
  actualizarLibretaUsuario,
  eliminarLibretaUsuario
}