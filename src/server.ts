// Importamos la config de dotenv
import 'dotenv/config'

// Creamos la constante PORT con el package dotnet para no subir al repositorio el puerto al que nos conectamos
const PORT = process.env.PORT || 4001

// importamos app desde app.ts
import { app } from "./app"

// Ponemos en marcha el servidor
const riseServer = () => {
    app.listen(PORT, () => {
        console.log(`the server is up on port ${PORT}`)
    })
}

riseServer()