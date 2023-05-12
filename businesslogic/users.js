const UserDAO = require('../dataaccess/dao/usuario_dao');

async function registerUser(user) {
  try {
    const resultados = await UserDAO.registroUsuario(user);
    return resultados;
  } catch (error) {
    console.error(error);
  }
}

async function activateUser(celular, opt) {
  try {
    const resultados = await UserDAO.activarUsuario(celular, opt);
    return resultados;
  } catch (error) {
    console.error(error);
  }
}

async function updateUser({ nombre, apellidos, contrasena }) {
  try {
    const resultados = await UserDAO.actualizarUsuario({
      idUsuario, nombre, apellidos, contrasena
    });
    return resultados;
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  registerUser,
  activateUser,
  updateUser,
}