// Importamos el package Express, junto con el Request y Response
import express, { Application } from "express"
import { Request, Response } from "express";

// Importamos la config de dotenv
import 'dotenv/config'

// Se importan automáticamente desde sus respectivos .ts en la carpeta ./src/Controllers
import { createRoles, deleteRoles, getRoles, updateRoles } from "./Controllers/rolesControllers";
import { deleteUsers, getOwnProfile, getUsers, updateOwnProfile} from "./Controllers/usersControllers";
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

// Creamos los endpoints con las distintas rutas, middlewares y controllers necesarios

//                                            Auth routes
// Endpoint para registrar usuarios
app.post('/api/auth/register', registration)
// Endpoint para logearse
app.post('/api/auth/login', login)

//                                                                           Users routes
// Endpoint para llamar a todos los usuarios (solo para super_admins)
app.get('/api/users', auth, isSuperAdmin, getUsers)
// Endpoint para llamar a un usuario a partir de su email (solo para super_admins)
app.get('/api/users?email=ejemplo@ejemplo.com', auth, isSuperAdmin, getUsers)
// Endpoint para llamar a tu propio perfil
app.get('/api/users/profile', auth, getOwnProfile)
// Endpoint para actualizar cualquier valor de tu perfil (excepto el role)
app.put('/api/users/profile', auth, updateOwnProfile)
// Endpoint para actualizar el role de cualquier usuario (solo para super_admins)
app.put('/api/users/:id/role', auth, isSuperAdmin, updateRoles)
// Endpoint para eliminar un usuario (solo para super_admins)
app.delete('/api/users/:id', auth, isSuperAdmin, deleteUsers)

//                               Roles routes
app.get('/roles', getRoles)
app.post('/roles', createRoles)
app.put('/roles', updateRoles)
app.delete('/roles', deleteRoles)