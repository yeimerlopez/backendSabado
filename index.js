const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/db");

conectarBD();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// rutas modulos

app.use("/api/usuarios", require("./routes/usuariosRoute"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clientes", require("./routes/clientesRoute"));

app.get("/", (req, res) => {
  res.send("Hello World, Saludo!!!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

