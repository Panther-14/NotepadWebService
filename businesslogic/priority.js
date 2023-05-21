const PriorityDAO = require('../dataaccess/dao/prioridad_dao');

async function selectPriorities(){
  try {
    const resultados = await PriorityDAO.obtenerPrioridades();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  selectPriorities
}