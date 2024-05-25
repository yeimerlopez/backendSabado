const moongoose = require("mongoose");

const UsuariosSchema = new moongoose.Schema({
  nombres: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongoose.model("Usuarios", UsuariosSchema);
