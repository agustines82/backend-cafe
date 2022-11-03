import { validationResult } from "express-validator";
import Usuario from "../models/usuario";

export const listarUsuarios = async (req, res) => {
    try {
        //buscar en la BD la collection de usuarios
        const usuarios = await Usuario.find();
        //enviar respuesa al frontend
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar los usuarios",
        });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        //trabajar con el resultado de la validacion
        const errors = validationResult(req);
        //errors.isEmpty()true o flase dependiendo si tiene o no errores
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }
        console.log(req.body);
        //tomar el body y validarlo
        //guardar el usuario en la BD
        const usuarioNuevo = new Usuario(req.body);
        await usuarioNuevo.save();
        res.status(201).json({
            mensaje: "El usuario fue creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "ocurrio un error al intentar agregar el usuario",
        });
    }
};
