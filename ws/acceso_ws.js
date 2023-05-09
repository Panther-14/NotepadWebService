const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Endpoint para generar un token
router.post('/login', (req, res) => {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  // Verifica las credenciales de usuario (aquí puedes implementar tu lógica de autenticación básica)
  if (username === USERNAME && password === PASSWORD) {
    // Credenciales válidas, genera un token que expira en 1 hora
    jwt.sign({ user: { username } }, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Upss" });
        return;
      }
      res.json({ token });
    });
  } else {
    // Credenciales inválidas, retorna un error de autenticación
    res.status(401).json({ error: true, message: "Credenciales inválidas" });
  }
});

router.post('/registro', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
});

router.post('/activar', (req, res) => {
});

module.exports = router;