import mongoose from "mongoose";

const url = "mongodb://localhost:27017/cafe-sampy"; //127.0.0.1 = localhost

mongoose.connect(url);

const conexion = mongoose.connection;

conexion.once("open", () => {
    console.log("BD conectada");
});
