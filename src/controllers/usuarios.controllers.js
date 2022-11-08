import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";

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

        const { email, password } = req.body;
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                mensaje: "el usuario ya fue registrado",
            });
        }

        //tomar el body y validarlo
        //guardar el usuario en la BD
        const usuarioNuevo = new Usuario(req.body);

        //encriptar la contrseña con bcript
        const salt = bcrypt.genSaltSync();
        usuarioNuevo.password = bcrypt.hashSync(password, salt);

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

export const login = async (req, res) => {
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

        const { email, password } = req.body;
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: "Correo o password invalido",
            });
        }

        //verificar si el password que me envian corresponde con el password enccriptado de la BD
        const passwordValid = bcrypt.compareSync(password, usuario.password); // devuelve true o false
        if (!passwordValid) {
            return res.status(400).json({
                mensaje: "Correo o password invalido",
            });
        }
        //generar el token y enviarlo
        const token = await generarJWT(usuario._id, usuario.usuario);

        //responder
        res.status(201).json({
            mensaje: "El usuario existe",
            uid: usuario._id,
            nombre: usuario.usuario,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "ocurrio un error al intentar logear el usuario",
        });
    }
};
