const Usuarios = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Funcio autenticar un usuario

exports.autenticarUsuario = async (req, res) => {
  //Revisamos validacion para ver si encontramos un error
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el correo y el password
  const { correo, password } = req.body;
  console.log(req.body);

  try {
    // Revisar que el usuario exista
    const usuario = await Usuarios.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // Revisar el password
    const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Si todo es correcto crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        // Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    let usuario = await Usuarios.findById(req.usuario.id);
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
