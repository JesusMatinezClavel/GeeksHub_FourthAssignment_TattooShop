// Importamos el package Express, junto con el Request y Response
import express, { Application } from "express"
import { Request, Response } from "express";
import cors from "cors";

// Importamos la config de dotenv
import 'dotenv/config'

// Se importan automáticamente desde sus respectivos .ts en la carpeta ./src/Controllers
// import { createRoles, deleteRoles, getRoles, updateRoles } from "./Controllers/rolesControllers";
import { deleteUsers, getAllUsers, getOwnProfile, updateOwnProfile, updateRoles } from "./Controllers/usersControllers";
import { login, registration } from "./Controllers/authControllers";
import { auth } from "./middelware/auth";
import { isSuperAdmin } from "./middelware/isSuperAdmin";
import { createAppointment, getAppointments, getAppointmentsById, updateAppointment } from "./Controllers/appointmentControllers";
import { createNewService, deleteService, getAllServices, updateService } from "./Controllers/serviceControllers";

// Creamos la constante App a partir de express
export const app: Application = express()

// Creamos el middleware de Express para manejar los datos como .json
app.use(express.json());
app.use(cors())

// Comprobamos si el servidor responde correctamente
app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).json({
        serverUp: true,
        message: `the server is healthy`
    })
})

// Creamos las rutas para las distintas tablas importando las funciones desde la carpeta ./src/Controllers
//                               Roles routes
// app.get('/roles', getRoles)
// app.post('/roles', createRoles)
// app.put('/roles', updateRoles)
// app.delete('/roles', deleteRoles)


//                                                             Auth routes

app.post('/api/auth/register', registration)
app.post('/api/auth/login', login)

//                                                             Users routes
app.get('/api/users', auth, isSuperAdmin, getAllUsers)
app.get('/api/users?email=', auth, isSuperAdmin, getAllUsers)
app.get('/api/users/profile', auth, getOwnProfile)
app.put('/api/users/profile', auth, updateOwnProfile)
app.put('/api/users/:id/role', auth, isSuperAdmin, updateRoles)
app.delete('/api/users/:id', auth, isSuperAdmin, deleteUsers)

//                                                             Appointments routes
app.post('/api/appointments', auth, createAppointment)
app.put('/api/appointments', auth, updateAppointment)
app.get('/api/appointments', auth, getAppointments)
app.get('/api/appointments/:id', auth, getAppointmentsById)


//                                                             Services routes
app.get('/api/services', getAllServices)
app.post('/api/services', auth, isSuperAdmin, createNewService)
app.put('/api/services/:id', auth, isSuperAdmin, updateService)
app.delete('/api/services/:id', auth, isSuperAdmin, deleteService)
