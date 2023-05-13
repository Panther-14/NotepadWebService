const { Router } = require("express");
const router = Router();

const basicAuth = require("../security/basic_auth");
const Usuario = require("../dataaccess/domain/usuario");
const UsuarioBusiness = require("../businesslogic/users");
const generateRandomNumber = require("../util/otp_generator");
const sendMessage = require("../util/sms_sender");

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

router.use(basicAuth);

router.post("/login", (req, res) => {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  UsuarioBusiness.loginUser(username, password)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      // Verifica las credenciales de usuario (aquí puedes implementar tu lógica de autenticación básica)
      if (resultados.length > 0) {
        // Credenciales válidas, genera un token que expira en 1 hora
        jwt.sign({ user: { username } }, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            console.error(err);
             res.status(500).json({ error: true, message: "Error en el token" });
            return;
          }
          res.json({ token });
        });
      } else {
        // Credenciales inválidas, retorna un error de autenticación
        res.status(401).json({error: true, message: "Credenciales inválidas"});
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: 'Error al iniciar sesión' });
    });
});

router.post("/registro", (req, res) => {
  const { nombres, apellidos, celular, contrasena } = req.body;

  const otp = generateRandomNumber(6);
  console.log(otp);

  const usuario = new Usuario(
    nombres,
    apellidos,
    new Date().toISOString().slice(0, 19).replace("T", " "),
    0,
    celular,
    contrasena,
    "",
    null,
    otp,
    null
  );

  UsuarioBusiness.registerUser(usuario)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if(resultados.affectedRows> 0){
        sendMessage(celular, otp);
        res.status(200).json({ error: false, message: 'Registro de Usuario exitosa', affectedRows: resultados.affectedRows });
      }else{
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error en el registro" });
    });
});

router.post("/activar", (req, res) => {
  const { celular, otp } = req.body;
  UsuarioBusiness.activateUser(celular, otp)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if(resultados.affectedRows> 0){
        res.status(200).json({ error: false, message: 'Activación de Usuario exitosa', affectedRows: resultados.affectedRows });
      }else{
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error en la activación" });
    });
});

module.exports = router;