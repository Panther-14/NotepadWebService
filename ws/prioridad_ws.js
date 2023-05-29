const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const PrioridadBusiness = require('../businesslogic/priority');

router.use(verifyToken);

router.get('/consultar', (req, res) => {
    PrioridadBusiness.selectPriorities()
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if(resultados.length > 0){
        res.status(200).json({ error: false, message: 'Consulta de Prioridades exitosa', priorities: resultados});
      }else{
        res.status(200).json({ error: false, message: 'Nada que mostrar', priorities: resultados});
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

module.exports = router;