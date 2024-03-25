// Importamos la config de dotenv
import 'dotenv/config'

// Creamos la constante PORT con el package dotnet para no subir al repositorio el puerto al que nos conectamos
const PORT = process.env.PORT || 4001

// importamos app desde app.ts y db.ts
import { app } from "./app"
import { AppDataSource } from './database/db'


// Ponemos en marcha el servidor tras comprobar que la base de datos está conectada
const startServer = () => {
    AppDataSource.initialize()
        // Si la base de datos está conectada nos avisará por el terminal del puerto
        .then(() => {
            console.log(`database connected`)
            // Cuando la base de datos está encendida se inicia el servidor en el puerto asignado
            app.listen(PORT, () => {
                console.log(`the server is up on port ${PORT}`)
            })
        })
        // Si la base de datos no está conectada nos dará un error
        .catch(error => {
            console.log(error)
        })
}

// Ejecutamos la función para levantar el servidor cuando la base de datos esté conectada
startServer()