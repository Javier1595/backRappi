const categoriaCtrl = {};
const Categoria = require('../model/categoria.model');

//método para obtener todas las categorias
categoriaCtrl.getCategorias = async(req, res)=>{
    try {
        const categorias = await Categoria.find({});
        if(Object.entries(categorias).length === 0){
            res.status(200).send("No se encontraron categorias en el sistema");
        }else{
            res.status(200).json(categorias);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar las categorias");
    }
};

// método para buscar una categoria por el nombre
categoriaCtrl.getCategoria = async(req, res)=>{
    try {
        const categoria = await Categoria.findOne({ codigo: req.params.codigo });
        if(categoria === null){
            res.status(200).send("No se encontró la categoría en el sistema");
        }else{
            res.status(200).json(categoria);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar la categoría");
    }
};

categoriaCtrl.createCategoria = async(req, res)=>{
    try {
        const categoriaTemp = {
            codigo:req.body.codigo,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion
        };
        let _categoria = new Categoria(categoriaTemp);
        await _categoria.save();
        res.status(201).send("Categoría creada satisfactoriamente.");

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear la categoría");
    }
};

categoriaCtrl.editCategoria = async(req, res)=>{
    try {
        const categoria = await Categoria.findOne({ codigo: req.params.codigo });
        if(categoria === null){
            res.status(200).send("No se encontró la categoría en el sistema");
        }else{
            const categoriaTemp = {
                codigo:req.body.codigo,
                nombre:req.body.nombre,
                descripcion:req.body.descripcion
            };
            
            await Categoria.updateOne({codigo:req.params.codigo}, categoriaTemp);
            res.status(201).send("Actualizacion de categoría satisfactoria.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al editar la categoría");
    }
};

categoriaCtrl.deleteCategoria = async(req, res)=>{
    try {
        const categoria = await Categoria.findOne({ codigo: req.params.codigo });
        if(categoria === null){
            res.status(200).send("No se encontró la categoría en el sistema");
        }else{
            await Categoria.deleteOne({codigo:req.params.codigo});
            res.status(200).send("Categoría eliminada con éxito.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al eliminar la categoría");
    }
};

module.exports = categoriaCtrl;