const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/authMiddleware");
const authController = require("../controllers/AuthController");

//autenticamos al usuario

router.post(
  "/",
  [
    check("correo", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 10 }),
    // check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  // usuarioController.autenticarUsuario
  authController.autenticarUsuario
);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
