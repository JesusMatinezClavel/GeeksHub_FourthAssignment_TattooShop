// Importamos el package Express, junto con el Request y Response
import express, { Application } from "express"
import { Request, Response } from "express";

// Importamos la config de dotenv
import 'dotenv/config'

// Se importan automáticamente desde sus respectivos .ts en la carpeta ./src/Controllers
import { createRoles, deleteRoles, getRoles, updateRoles } from "./Controllers/rolesControllers";
import { createUsers, deleteUsers, getAllUsers, getOwnProfile, getUserById, updateUsers } from "./Controllers/usersControllers";
import { login, registration } from "./Controllers/authControllers";
import { auth } from "./middelware/auth";
import { isSuperAdmin } from "./middelware/isSuperAdmin";

// Creamos la constante App a partir de express
export const app: Application = express()

// Creamos el middleware de Express para manejar los datos como .json
app.use(express.json());

// Comprobamos si el servidor responde correctamente
app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).json({
        serverUp: true,
        message: `the server is healthy`
    })
})

// Creamos las rutas para las distintas tablas importando las funciones desde la carpeta ./src/Controllers

//                               Auth routes

app.post('/api/auth/register', registration)
app.post('/api/auth/login', login)


//                               Roles routes
app.get('/roles', getRoles)
app.post('/roles', createRoles)
app.put('/roles', updateRoles)
app.delete('/roles', deleteRoles)

//                               Users routes
app.get('/api/users', auth, isSuperAdmin, getAllUsers)
app.get('/api/users/profile', auth, getUserById)
app.get('/api/users/profile', auth, getOwnProfile)
app.post('/users', createUsers)
app.put('/users', updateUsers)
app.delete('/users', deleteUsers)