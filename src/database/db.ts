import "reflect-metadata"
import { DataSource } from "typeorm"
import { Roles1708974400667 } from "./migrations/1708974400667-roles"
import 'dotenv/config'
import { Users1708975838186 } from "./migrations/1708975838186-users"
import { Services1708977243636 } from "./migrations/1708977243636-services"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_host || "localhost",
    port: Number(process.env.DB_port) || 3306,
    username: process.env.DB_username || "root",
    password: process.env.DB_password || "",
    database: process.env.DB_database || "test",
    entities: [],
    migrations: [Roles1708974400667,Users1708975838186,Services1708977243636],
    synchronize: false,
    logging: false
})