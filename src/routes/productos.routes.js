//rutas
import { Router } from "express";
import { crearProducto, listarProductos, obtenerProducto } from "../controllers/productos.controllers";

const router = Router();
router.route("/productos").get(listarProductos).post(crearProducto);
router.route("/productos/:id").get(obtenerProducto);
// app.get("/prueba", (reg, res) => {
//     res.send("esto es una prueba de peticion get");
// });
// app.delete("/prueba", (reg, res) => {
//     res.send("aqui tendría que borrar un dato");
// });

export default router;
