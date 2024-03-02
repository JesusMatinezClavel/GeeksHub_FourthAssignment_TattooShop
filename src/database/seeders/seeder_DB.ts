import { seederAppointments } from "./appointmentsSeeder";
import { seederRoles } from "./roleSeeder";
import { seederServices } from "./serviceSeeder";
import { seederUsers } from "./userSeeder";

const seedDB = async () => {

    // await seederRoles()

    // await seederUsers()

    // await seederServices()

    await seederAppointments()
}


seedDB()