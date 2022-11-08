import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minLenght: 2,
        maxLenght: 50,
    },
    apellido: {
        type: String,
        required: true,
        minLenght: 2,
        maxLenght: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLenght: 200
    },
    password: {
        type: String,
        required: true,
    },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
