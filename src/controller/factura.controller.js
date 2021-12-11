const facturaController = {};
const Factura = require('../model/factura.model')


facturaController.getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find({});
        if(Object.entries(facturas).length === 0){
            res.status(200).send("No se encontraron facturas en el sistema");
        }else{
            res.status(200).json(facturas);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar las facturas");
    }
};


facturaController.getFactura = async (req, res) => {
    try {
        const factura = await Factura.findOne({ numeroFactura: req.params.numeroFactura });
        if(factura === null){
            res.status(200).send("No se encontró la factura en el sistema");
        }else{
            res.status(200).json(factura);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar la factura");
    }
};


facturaController.createFactura = async (req, res) => {
    try {
        const {
            numeroFactura,    
            cliente,
            fecha,
            numPedido,
            lugarEntrega,
            modoPago
        } = req.body;

        let _factura = new Factura({numeroFactura, cliente, fecha, numPedido, lugarEntrega, modoPago});
        await _factura.save();

        res.status(201).send("Factura creada satisfactoriamente");

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear la factura");
    }

};

facturaController.editFactura = async (req, res) => {
    try {
        const factura = await Factura.findOne({ numeroFactura: req.params.numeroFactura });
        if(factura === null){
            res.status(200).send("No se encontró la factura en el sistema");
        }else{
            const {
                numeroFactura,    
                cliente,
                fecha,
                numPedido,
                lugarEntrega,
                modoPago
            } = req.body;

            await Factura.updateOne({ numeroFactura: req.params.numeroFactura }, {numeroFactura, cliente, fecha, numPedido, lugarEntrega, modoPago});
            res.status(200).send("Actualizacion de factura satisfactoria.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al actualizar la factura");
    }
};

facturaController.deleteFactura = async (req, res) => {
    try {
        const factura = await Factura.findOne({ numeroFactura: req.params.numeroFactura });
        if(factura === null){
            res.status(200).send("No se encontró la factura en el sistema");
        }else{
            await Factura.deleteOne({numeroFactura: req.params.numeroFactura });
            res.status(200).send("Factura eliminada con éxito.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al eliminar la factura");
    }
};

module.exports = facturaController;
