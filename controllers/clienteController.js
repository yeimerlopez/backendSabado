const Cliente = require("../models/cliente_model");

/**
 * funcion agregar clientes
 *
 */


exports.agregarCliente = async (req, res) => {
  try {
    let Clientes;
    Clientes = new Cliente(req.body);
    await Clientes.save();
    res.send(Clientes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el cliente"); //CAMBIAR 7:28 CLASE 62
  }
};

/***
 * Funcion para buscar clientes
 */

exports.buscarClientes = async (req, res) => {
  try {
    const cliente = await Cliente.find();
    res.json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al buscar un  cliente");
  }
};

/**
 * Funcion para buscar un cliente por ID
 */

exports.buscarClienteId = async (req, res) => {
  try {
    const clienteID = await Cliente.findById(req.params.id);
    if (!clienteID) {
      res.status(404).json({ msg: "No existe un cliente con ese ID" });
      return;
    }
    res.send(clienteID);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al buscar un  cliente por ID");
  }
};

/**
 * Funcion para actualizar un cliente
 */

exports.actualizarCliente = async (req, res) => {
  try {
    const { nombres, apellidos, documento, correo, telefono, direccion } =
      req.body;
    let cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).json({ msg: "No existe un cliente con ese ID" });
    } else {
      cliente.nombres = nombres;
      cliente.apellidos = apellidos;
      cliente.documento = documento;
      cliente.correo = correo;
      cliente.telefono = telefono;
      cliente.direccion = direccion;
      cliente = await Cliente.findOneAndUpdate(
        { _id: req.params.id },
        cliente,
        { new: true }
      );
      res.json({cliente});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al Actualizar un  cliente por ID");
  }
};

/**
 * Funcion para eliminar un cliente
 *
 */

exports.eliminarCliente = async (req, res) => {
  try {
    let clienteEliminar = await Cliente.findById(req.params.id);
    if (!clienteEliminar) {
      res.status(404).json({ msg: "No existe un cliente con ese ID" });
      return;
    }
    await Cliente.findOneAndDelete({ _id: req.params.id }); // este cliente en mayuscula hace referencia a el modelo
    res.json({ msg: "El cliente ha sido eliminado" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al eliinar un  cliente por ID");
  }
};
