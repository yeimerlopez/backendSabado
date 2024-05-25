const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");

// estas son las rutas de nuestro servidor

router.post("/clientes/agregarCliente", clienteController.agregarCliente);
router.get("/clientes/find", clienteController.buscarClientes);
router.get("/clientes/:id", clienteController.buscarClienteId);
router.delete("/clientes/:id", clienteController.eliminarCliente);
router.put("/clientes/:id", clienteController.actualizarCliente);

//Rutas Productos
router.post("/productos/createProducto", productoController.createProduct);
router.get("/productos/getAllProducts", productoController.getAllProducts);
router.get("/productos/:id", productoController.getProductById);
router.put("/productos/:id", productoController.updateProduct3);
router.delete("/productos/:id", productoController.deleteProduct);

module.exports = router;

/**esto se trajo del otro proyecto asi completo no se le ha agregado ni quitado */
