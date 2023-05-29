const connection = require("../db_connection");

function obtenerNotas({ idUsuario, idLibreta = -255, idPrioridad = -255 }) {
    if (idLibreta !== -255 && idPrioridad !== -255) {
      return obtenerNotasLibretaPrioridad(idUsuario, idLibreta, idPrioridad);
    }

    if (idLibreta !== -255 && idPrioridad === -255) {
      return obtenerNotasLibreta(idUsuario, idLibreta);
    }

    if (idLibreta === -255 && idPrioridad !== -255) {
      return obtenerNotasPrioridad(idUsuario, idPrioridad);
    }

    return obtenerNotasUsuario(idUsuario);
}

function insertarNota(nota){
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO notas SET ?';

    connection.query(sql, nota, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function actualizarNota({ idUsuario, idNota, titulo, contenido, idPrioridad}){
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE notas SET titulo = ?, contenido = ?, idPrioridad = ? WHERE idNota = ? AND idUsuario = ?;';
    const values = [titulo, contenido, idPrioridad, idNota, idUsuario];
    
    connection.query(sql, values, (error, results) => {
      if(error){
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function eliminarNota(idNota, idUsuario){
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE notas SET eliminado = ? WHERE idNota = ? AND idUsuario = ?;';
    const values = [1, idNota, idUsuario];
    
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function existeNota(titulo){
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS existen FROM notas WHERE titulo = ?;';

    connection.query(sql, titulo, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
      console.log("Results:", results);
    });
  });
}

// <----- Private Functions ----->
function obtenerNotasLibretaPrioridad(idUsuario, idLibreta, idPrioridad) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notas WHERE idUsuario = ? AND IdLibreta = ? AND idPrioridad = ? AND eliminado = ?";
    const values = [idUsuario, idLibreta, idPrioridad, 0];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function obtenerNotasLibreta(idUsuario, idLibreta) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notas WHERE idUsuario = ? AND IdLibreta = ? AND eliminado = ?";
    const values = [idUsuario, idLibreta, 0];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function obtenerNotasPrioridad(idUsuario, idPrioridad) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notas WHERE idUsuario = ? AND idPrioridad = ? AND eliminado = ?";
    const values = [idUsuario, idPrioridad, 0];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function obtenerNotasUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notas WHERE idUsuario = ? AND eliminado = ?";
    const values = [idUsuario, 0];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
    obtenerNotas,
    insertarNota,
    actualizarNota,
    eliminarNota,
    existeNota
};