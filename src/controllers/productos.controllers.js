import Producto from "../models/producto";
export const listarProductos = async (req, res) => {
    try {
        //buscar en la BD la collection de productos
        const productos = await Producto.find();
        //enviar respuesa al frontend
        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar los productos",
        });
    }
};
export const crearProducto = async (req, res) => {
    try {
        console.log(req.body);
        //tomar el body y validarlo
        //guardar el objeto en la BD
        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        res.status(201).json({
            mensaje: "El producto fue creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "ocurrio un error al intentar agregar un producto",
        });
    }
};
export const obtenerProducto = async (req, res) => {
    try {
        //extraer id de la ruta
        console.log(req.params.id);
        //buscar en la BD el producto que tenga ese id
        const productoBuscado = await Producto.findById(req.params.id);
        //responder al frontend con el objeto encontrado
        res.status(200).json(productoBuscado);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar el producto",
        });
    }
};
