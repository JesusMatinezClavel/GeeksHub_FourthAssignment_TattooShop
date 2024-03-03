import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

// Generamos una cita aleatoria con el package faker
export const generateAppointment = () => {

    const randomAppointment = new Appointment()
    const startDate = faker.date.soon()
    const endDate = faker.date.future()
    // Utilizamos startDate y endDate para generar una desde los próximos dias hasta dentro de un año
    randomAppointment.appointmentDate = faker.date.between({ from: startDate, to: endDate })
    // Generamos un user_id y service_id asignando números aleatorios
    randomAppointment.user = {
        id: faker.number.int({ min: 1, max: 20 })
    } as User // <-------- Tenemos que indicarle que este valor hace referencia al User de la entidad Appointment
    randomAppointment.service = {
        id: faker.number.int({ min: 1, max: 5 })
    } as Service // <-------- Tenemos que indicarle que este valor hace referencia al Service de la entidad Appointment
    return randomAppointment

}

// Exportamos la función del seeder de las citas para llamarla junto con el resto de seeders
export const seederAppointments = async () => {

    // Importamos el generador de citas aleatorio
    generateAppointment()
    // Creamos un array con 20 citas
    const appointments = Array.from({ length: 20 }, generateAppointment)

    await Appointment.save(appointments);


    // Mandamos un mensaje por consola para confirmar que las citas se han creado correctamente
    console.log(`---------------------------`);
    console.log(`Appointments have been generated succesfully!`);
    console.log(`---------------------------`);
}