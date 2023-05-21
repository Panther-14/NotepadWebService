const connection = require("../db_connection");

function obtenerPrioridades() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM prioridades";

    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = { 
    obtenerPrioridades
};
