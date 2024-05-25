const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El password debe ser minimo de 10 caracteres").isLength({
      min: 10,
    }),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
