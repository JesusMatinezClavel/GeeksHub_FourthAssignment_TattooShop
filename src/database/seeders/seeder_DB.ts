import { AppDataSource } from "../db";
import { seederAppointments } from "./appointmentsSeeder";
import { seederRoles } from "./roleSeeder";
import { seederServices } from "./serviceSeeder";
import { generateControlUsers, seederUsers } from "./userSeeder";

// Creamos una función para llamar a todos los seeders por orden con el then/catch y así evitar problemas con las FK
const seedDB = async () => {

    // Iniciamos la conexción con la base de datos
    await AppDataSource.initialize()
        .then(() => seederRoles())

        .then(() => seederServices())

        .then(() => generateControlUsers())

        .then(() => seederUsers())

        .then(() => seederAppointments())

        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            AppDataSource.destroy()
        })
}

// Llamamos a la función con el comando 'npm run seed-db' configurado en el package.json
seedDB()