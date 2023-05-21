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
    console.log("Existe", exists);
    if(exists[0].existen === 0){
      console.log("ExisteIF", exists);
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
    console.log("Existe", exists);
    if(exists[0].existen === 0){
      console.log("ExisteIF", exists);
      const resultados = await NoteDAO.actualizarNota({ idUsuario, idNota, titulo, contenido, idPrioridad });
      return resultados;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteNote(idNota){
  try{
    const resultados = await NoteDAO.eliminarNota(idNota);
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
