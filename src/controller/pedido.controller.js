const pedidoController = {};
const Pedido = require('../model/pedido.model')


pedidoController.getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({});
        if(Object.entries(pedidos).length === 0){
            res.status(200).send("No se encontraron pedidos en el sistema");
        }else{
            res.status(200).json(pedidos);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar los pedidos");
    }
};

pedidoController.getPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ numeroPedido: req.params.numeroPedido });
        if(pedido === null){
            res.status(200).send("No se encontró el pedido en el sistema");
        }else{
            res.status(200).json(pedido);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar el pedido");
    }
};


pedidoController.createPedido = async (req, res) => {
    try {
        const pedidoTemp = {
            numeroPedido: req.body.numeroPedido,
            cliente: req.body.cliente,
            fecha: req.body.fecha,
            producto: req.body.producto
        };

        let _pedido = new Pedido(pedidoTemp);
        await _pedido.save();

        res.status(201).send("Pedido creado satisfactoriamente.");

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear el pedido");
    }

};

pedidoController.editPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ numeroPedido: req.params.numeroPedido });
        if(pedido === null){
            res.status(200).send("No se encontró el pedido en el sistema");
        }else{
            const {
                numeroPedido,
                cliente,
                fecha,
                producto
            } = req.body;


            await Pedido.findOneAndUpdate({ numeroPedido: req.params.numeroPedido }, {numeroPedido, cliente, fecha, producto });

            res.status(201).send("Actualizacion de pedido satisfactoria.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al editar el pedido");
    }
};

pedidoController.deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ numeroPedido: req.params.numeroPedido });
        if(pedido === null){
            res.status(200).send("No se encontró el pedido en el sistema");
        }else{
            await Pedido.deleteOne({numeroPedido: req.params.numeroPedido });
            res.status(200).send("Pedido eliminado con éxito.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al eliminar el pedido");
    }
};

module.exports = pedidoController;
