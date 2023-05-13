const NoteBookDAO = require('../dataaccess/dao/libreta_dao');

async function selectUserNotebooks(idUsuario){
  try {
    const resultados = await NoteBookDAO.obtenerLibretasUsuario(idUsuario);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function insertNotebook({ nombre, colorHexadecimal, idUsuario }){
  try {
    const resultados = await NoteBookDAO.registrarLibretaUsuario({ nombre, colorHexadecimal, idUsuario });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateNotebook({ nombre, colorHexadecimal, idLibreta, idUsuario }){
  try {
    const resultados = await NoteBookDAO.actualizarLibretaUsuario({ nombre, colorHexadecimal, idLibreta, idUsuario });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteNotebook({ idLibreta, idUsuario }){
  try {
    const resultados = await NoteBookDAO.eliminarLibretaUsuario({ idLibreta, idUsuario });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  selectUserNotebooks,
  insertNotebook,
  updateNotebook,
  deleteNotebook
}