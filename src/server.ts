// Importamos la config de dotenv
import 'dotenv/config'

// Creamos la constante PORT con el package dotnet para no subir al repositorio el puerto al que nos conectamos
const PORT = process.env.PORT || 4001

// importamos app desde app.ts y db.ts
import { app } from "./app"
import { AppDataSource } from './database/db'

// Ponemos en marcha el servidor
const riseServer = () => {
    AppDataSource.initialize()
        .then(() => {
            console.log(`database connected on port ${process.env.DB_port}`)
            app.listen(PORT, () => {
                console.log(`the server is up on port ${PORT}`)
            })
        })
        .catch(error => {
            console.log(error)
        })
}

// Ejecutamos la función para levantar el servidor cuando la base de datos esté conectada
riseServer()