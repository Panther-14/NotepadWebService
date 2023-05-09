const { Router } = require('express');
const router = Router();

// Endpoint de inicio
router.get('/', (req, res) => {
  res.send('Bienvenido a mi API');
});

module.exports = router;