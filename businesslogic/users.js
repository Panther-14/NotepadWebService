const UserDAO = require('../dataaccess/dao/usuario_dao');

async function loginUser(username, password) {
  try {
    const resultados = await UserDAO.accederUsuario(username, password);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerUser(user) {
  try {
    const resultados = await UserDAO.registroUsuario(user);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function activateUser(celular, opt) {
  try {
    const resultados = await UserDAO.activarUsuario(celular, opt);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateUser({ idUsuario, nombre, apellidos, contrasena }) {
  try {
    const resultados = await UserDAO.actualizarUsuario({
      idUsuario, nombre, apellidos, contrasena
    });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateLoginUser(idUsuario) {
  try {
    const resultados = await UserDAO.actualizarAccesoUsuario(idUsuario);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}



module.exports = {
  loginUser,
  registerUser,
  activateUser,
  updateUser,
  updateLoginUser
}