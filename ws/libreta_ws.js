const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const UsuarioBusiness = require('../businesslogic/users');

router.use(verifyToken);

router.get('/consultar/:idUsuario', (req, res) => {
  const idUsuario = req.params.idUsuario;
  UsuarioBusiness.selectUser(idUsuario)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    res.status(200).json({ error: true, message: 'Consulta exitosa' });
  })
  .catch((error) => {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: true, message: 'Error en la consulta' });
  });
});

router.post('/registrar', (req, res) => {
  const { nombre, colorHexadecimal } = req.body;
  UsuarioBusiness.(usuario)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    res.status(200).json({ error: true, message: 'Registro exitoso' });
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

router.put('/actualizar', (req, res) => {
});

router.delete('/eliminar', (req, res) => {
});

module.exports = router;