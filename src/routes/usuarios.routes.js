import { Router } from "express";
import { crearUsuario, listarUsuarios } from "../controllers/usuarios.controllers";
import { check } from "express-validator";
const router = Router();
router
    .route("/usuarios")
    .get(listarUsuarios)
    .post(
        [
            check("nombre")
                .notEmpty()
                .withMessage("El nombre del usuario es un dato obligatorio")
                .isLength({ min: 2, max: 50 })
                .withMessage("El nombre del usuario debe tener entre 2 y 50 caracteres"),
            check("apellido")
                .notEmpty()
                .withMessage("El apellido del usuario es un dato obligatorio")
                .isLength({ min: 2, max: 50 })
                .withMessage("El apellido del usuario debe tener entre 2 y 50 caracteres"),
            check("email")
                .notEmpty()
                .withMessage("El email es un dato obligatorio")
                .matches(
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
                )
                .withMessage("debes ingresar un email valido"),
            check("password")
                .notEmpty()
                .withMessage("La contraseña es un dato obligatorio")
                .matches(
                    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
                )
                .withMessage("debes ingresar una contraseña valida")
        ],
        crearUsuario
    );
export default router;