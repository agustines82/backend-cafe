import Producto from "../models/producto";
export const listarProductos = (req, res) => {
    res.send("esto es una prueba de peticion get");
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
