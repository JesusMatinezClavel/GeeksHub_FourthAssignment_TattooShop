import { AppDataSource } from "../db";
import { seederAppointments } from "./appointmentsSeeder";
import { seederRoles } from "./roleSeeder";
import { seederServices } from "./serviceSeeder";
import { seederUsers } from "./userSeeder";

const seedDB = async () => {
    try {

        // await seederRoles()

        // await seederUsers()

        // await seederServices()

        await seederAppointments()

    } catch (error) {
        console.log(error); 
    }
}


seedDB()