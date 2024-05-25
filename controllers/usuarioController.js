const Usuarios = require("../models/usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //Revisamos validacion para ver si encontramos un error

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer el correo y el password
  const { correo, password } = req.body;

  try {
    // Revisar que el usuario no exista
    const usuarioExiste = await Usuarios.findOne({ correo });
    if (usuarioExiste) {
      console.log("el usuario ya existe");
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crear el nuevo usuario
    usuario = new Usuarios(req.body);

    // Hashear el password
    // const salt = await bcryptjs.genSalt(10);

    usuario.password = await bcryptjs.hash(password, 12);

    //Guardar el usuario
    await usuario.save();

    //Crear y firmar el JWT
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
    console.log("Error: ", error);
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
