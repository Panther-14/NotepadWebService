const { Router } = require('express');
const router = Router();

const basicAuth = require('../security/basic_auth');
const Usuario = require('../dataaccess/domain/usuario');
const UsuarioBusiness = require('../businesslogic/users');

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

router.use(basicAuth);

router.post('/login', (req, res) => {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  // Verifica las credenciales de usuario (aquí puedes implementar tu lógica de autenticación básica)
  if (username === USERNAME && password === PASSWORD) {
    // Credenciales válidas, genera un token que expira en 1 hora
    jwt.sign({ user: { username } }, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Upss, token" });
        return;
      }
      res.json({ token });
    });
  } else {
    // Credenciales inválidas, retorna un error de autenticación
    res.status(401).json({ error: true, message: "Credenciales inválidas", cred: [username, USERNAME, password, PASSWORD] });
  }
});

router.post('/registro', (req, res) => {
  const {
    nombre,
    apellidos,
    celular,
    contrasenia,
  } = req.body;

  const otp = '123456';
  
  const usuario = new Usuario(
    nombre,
    apellidos,
    new Date().toISOString(),
    0,
    celular,
    contrasenia,
    '',
    null,
    otp,
    null
  );
  
  UsuarioBusiness.registroUsuarios(usuario)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    res.status(200).json({ error: true, message: 'Registro exitoso' });
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
  
});

router.post('/activar', (req, res) => {
  const { celular, otp } = req.body;
  UsuarioBusiness.activateUser(celular, opt)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    res.status(200).json({ error: true, message: 'Registro exitoso' });
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

module.exports = router;