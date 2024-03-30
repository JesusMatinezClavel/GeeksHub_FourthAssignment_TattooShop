import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import dayjs from "dayjs";

export const generateAppointment = () => {

    // Creamos una nueva Appointment a partir del 2024-03-03 hasta el 2028-03-03 utilizando faker
    const randomAppointment = new Appointment()
    const startDate = new Date('2024-03-03');
    const endDate = new Date('2030-03-03');
    randomAppointment.appointmentDatetime = faker.date.between({ from: startDate, to: endDate })
    randomAppointment.user = {
        id: faker.number.int({ min: 1, max: 20 })
    } as User
    randomAppointment.service = {
        id: faker.number.int({ min: 1, max: 5 })
    } as Service
    return randomAppointment

}

export const seederAppointments = async () => {

    // Creamos un array de 10 valores generando una Appointment en cada uno de ellos
    const appointments = Array.from({ length: 10 }, generateAppointment)

    // Guardamos las Appointments generadas
    await Appointment.save(appointments);


    console.log(`---------------------------`);
    console.log(`Appointments have been generated succesfully!`);
    console.log(`---------------------------`);
}