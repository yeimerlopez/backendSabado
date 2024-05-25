const express = require("express");
const router = express.Router();
// const clienteController = require("../controllers/clienteController");
const clienteController = require("../controllers/clienteController");

router.get("/", clienteController.buscarClientes);
router.get("/getClientById", clienteController.buscarClientes);
router.post("/createClient", clienteController.agregarCliente);
router.delete("/:id", clienteController.eliminarCliente);

module.exports = router;
