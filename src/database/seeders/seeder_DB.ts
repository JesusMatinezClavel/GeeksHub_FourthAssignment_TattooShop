import { AppDataSource } from "../db";
import { generateAppointment, seederAppointments } from "./appointmentsSeeder";
import { seederRoles } from "./roleSeeder";
import { seederServices } from "./serviceSeeder";
import { generateControlUsers, seederUsers } from "./userSeeder";

const seedDB = async () => {

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