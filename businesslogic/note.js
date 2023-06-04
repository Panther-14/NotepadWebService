const NoteDAO = require("../dataaccess/dao/notas_dao");

async function selectUserNotes({ idUsuario, idLibreta, idPrioridad }) {
  try {
    const resultados = await NoteDAO.obtenerNotas({ idUsuario, idLibreta, idPrioridad });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function insertNote(nota) {
  try {
    const exists = await NoteDAO.existeNota(nota.titulo);
    if(exists[0].existen === 0){
      const resultados = await NoteDAO.insertarNota(nota);
      return resultados;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateNote({ idUsuario, idNota, titulo, contenido, idPrioridad }) {
  try {
    const exists = await NoteDAO.existeNota(titulo);
    if(exists[0].existen === 0){
      const resultados = await NoteDAO.actualizarNota({ idUsuario, idNota, titulo, contenido, idPrioridad });
      return resultados;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteNote(idNota, idUsuario){
  try{
    const resultados = await NoteDAO.eliminarNota(idNota, idUsuario);
    return resultados;
  } catch (error){
    console.error(error);
    return error;
  }
}

module.exports = {
  selectUserNotes,
  insertNote,
  updateNote,
  deleteNote
};
