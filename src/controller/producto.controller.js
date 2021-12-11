const productoController = {};
const Producto = require('../model/producto.model');

//const Categoria = require('../model/categoria.model');

/*productoController.getCategoria = async(req, res) =>{ 
    try {
        const categorias = await Categoria.find({});
        res.status(200).json(categorias);
    } catch (error) {
       console.log(error);
       res.status(400).send("Ocurrió un error en la operacion");
    }

}; */

productoController.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});
        if(Object.entries(productos).length === 0){
            res.status(200).send("No se encontraron productos en el sistema");
        }else{
            res.status(200).json(productos);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar los productos");
    }
};

productoController.getProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({ codigo: req.params.codigo });
        if(producto === null){
            res.status(200).send("No se encontró el producto en el sistema");
        }else{
            res.status(200).json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar el producto");
    }
};

productoController.createProducto = async (req, res) => {
    try {
        const productoTemp ={
            categoria: req.body.categoria,
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            unidades: req.body.unidades
        };

        let _producto = new Producto(productoTemp);
        await _producto.save();
        res.status(201).send("Producto creado satisfactoriamente.");

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear el producto");
    }
};

productoController.editProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({codigo: req.params.codigo});
        if(producto === null){
            res.status(200).send("No se encontró el producto en el sistema");
        }else{
            const {
                categoria,
                nombre,
                codigo,
                descripcion,
                precio,
                unidades
            } = req.body;

            await Producto.updateOne({ codigo: req.params.codigo }, { categoria, nombre, codigo, descripcion, precio, unidades });
            res.status(201).send("Actualizacion de producto satisfactoria");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al editar el producto");
    }
};

productoController.deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({codigo: req.params.codigo});
        if(producto === null){
            res.status(200).send("No se encontró el producto en el sistema");
        }else{
            await Producto.deleteOne({ codigo: req.params.codigo });
            res.status(200).send("Producto eliminado con éxito.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al eliminar el producto");
    }
};

module.exports = productoController;
