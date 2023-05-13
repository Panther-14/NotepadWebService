const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const UsuarioBusiness = require('../businesslogic/users');

router.use(verifyToken);

router.put('/actualizar', (req, res) => {
  const {
    idUsuario,
    nombre,
    apellidos,
    contrasena,
  } = req.body;
  
  UsuarioBusiness.updateUser({
    idUsuario: idUsuario,
    nombre: nombre,
    apellidos: apellidos,
    contrasena: contrasena
  })
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if(resultados.affectedRows> 0){
      res.status(200).json({ error: false, message: 'Actualización de Usuario exitosa', affectedRows: resultados.affectedRows });
    }else{
      res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

module.exports = router;