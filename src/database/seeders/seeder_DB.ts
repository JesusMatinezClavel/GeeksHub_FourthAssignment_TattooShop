import { AppDataSource } from "../db";
import { generateAppointment, seederAppointments } from "./appointmentsSeeder";
import { seederRoles } from "./roleSeeder";
import { seederServices } from "./serviceSeeder";
import { generateControlUsers, seederUsers } from "./userSeeder";

const seedDB = async () => {

        // Iniciamos la conexión a la base de datos 
        // Ejecutamos cada seeder por orden gracias al comando npm run seed-db
        await AppDataSource.initialize()

            .then(() => seederRoles())

            .then(() => seederServices())

            .then(()=> generateControlUsers())

            .then(() => seederUsers())

            .then(() => seederAppointments())

            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                AppDataSource.destroy()
            })
}

seedDB()