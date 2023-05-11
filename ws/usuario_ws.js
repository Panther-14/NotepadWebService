const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');

router.use(verifyToken);

router.put('/actualizar', (req, res) => {
  const {
    nombre,
    apellidos,
    contrasena,
  } = req.body;
  
  UsuarioBusiness.updateUser({
    nombre: nombre,
    apellidos: apellidos,
    contrasena: contrasena
  })
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