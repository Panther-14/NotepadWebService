const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const LibretaBusiness = require('../businesslogic/notebooks');

router.use(verifyToken);

router.get('/consultar/:idUsuario', (req, res) => {
  const idUsuario = req.params.idUsuario;
  LibretaBusiness.selectUserNotebooks(idUsuario)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      res.status(200).json({ error: false, message: 'Consulta exitosa', resultados: resultados });
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

router.post('/registrar', (req, res) => {
  const { nombre, colorHexadecimal, idUsuario } = req.body;
  LibretaBusiness.insertNotebook({ nombre, colorHexadecimal, idUsuario })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      res.status(200).json({ error: false, message: 'Registro exitoso' });
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: false, message: 'Error en el registro' });
    });
});

router.put('/actualizar', (req, res) => {
  const { nombre, colorHexadecimal, idLibreta, idUsuario } = req.body;
  LibretaBusiness. updateNotebook({ nombre, colorHexadecimal, idLibreta, idUsuario })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      res.status(200).json({ error: false, message: 'Actualización exitosa' });
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la actualización' });
    });
});

router.delete('/eliminar', (req, res) => {
  const { idLibreta, idUsuario } = req.body;
  LibretaBusiness.deleteNotebook({ idLibreta, idUsuario })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      res.status(200).json({ error: false, message: 'Eliminación exitosa' });
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la eliminación' });
    });
});

module.exports = router;