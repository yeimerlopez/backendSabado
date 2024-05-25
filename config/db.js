const mongoose = require("mongoose");
require("dotenv").config();
require("dotenv").config({ path: "variables.env" });

//Aca se crea una funcion para conectarse a la base de datos
const conectarBD = async () => {
  mongoose
    .connect(process.env.DB_MONGO)
    .then(() => console.log("Base de datos conectada."))
    .catch((error) => console.log(error));
};

module.exports = conectarBD;
