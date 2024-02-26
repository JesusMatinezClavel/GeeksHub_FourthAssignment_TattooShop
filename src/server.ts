// Importamos el package Express, junto con el Request y Response
import express, { Application } from "express"
import { Request, Response } from "express";

// Importamos la config de dotenv
import 'dotenv/config'

// Creamos la constante App a partir de express
const app: Application = express()

// Creamos el middleware de Express para manejar los datos como .json
app.use(express.json());

// Creamos la constante PORT con el package dotnet para no subir al repositorio el puerto al que nos conectamos
const PORT = process.env.PORT || 4001

// Ponemos en marcha el servidor
app.listen(PORT, () => {
    console.log(`the server is up on port ${PORT}`)
})

// Comprobamos si el servidor responde correctamente
app.get("/healthy", (req:Request, res:Response) => {
    res.status(200).json({
        serverUp: true,
        message: `the server is healthy`
    })
})