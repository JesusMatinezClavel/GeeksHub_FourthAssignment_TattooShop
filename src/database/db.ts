import "reflect-metadata"
import { DataSource } from "typeorm"

// Importamos la configuración de dotenv para poder trabajar con el archivo .env
import 'dotenv/config'

// Importamos las migraciones de las tablas y las entidades de las mismas
import { Roles1708974400667 } from "./migrations/1708974400667-roles"
import { Users1708975838186 } from "./migrations/1708975838186-users"
import { Services1708977243636 } from "./migrations/1708977243636-services"
import { Appointments1708976782137 } from "./migrations/1708976782137-appointments"
import { Role } from "../models/Role"
import { User } from "../models/User"
import { Service } from "../models/Service"
import { Appointment } from "../models/Appointment"
import { AddDefaultRoleIDUsers1709319089041 } from "./migrations/fixes/1709319089041-add_default_roleID_users"


// Cambiamos los primeros valores de AppDataSource por los valores introducidos en .env
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_host || "localhost",
    port: Number(process.env.DB_port) || 3306,
    username: process.env.DB_username || "root",
    password: process.env.DB_password || "",
    database: process.env.DB_database || "test",
    // Añadimos las entities de la carpeta ./src/models
    entities: [Role, User, Service, Appointment],
    // Añadimos el campo "migrations" para poder crear las tablas a través del terminal
    migrations: [
        Roles1708974400667,
        Users1708975838186,
        Services1708977243636,
        Appointments1708976782137,
        AddDefaultRoleIDUsers1709319089041
    ],
    synchronize: false,
    logging: false
})