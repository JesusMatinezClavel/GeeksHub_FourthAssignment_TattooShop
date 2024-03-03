import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

export const generateAppointment = () => {

    const randomAppointment = new Appointment()
    const startDate = faker.date.soon()
    const endDate = faker.date.future()
    randomAppointment.appointmentDate = faker.date.between({ from: startDate, to: endDate })
    randomAppointment.user = {
        id: faker.number.int({ min: 1, max: 20 })
    } as User
    randomAppointment.service = {
        id: faker.number.int({ min: 1, max: 5 })
    } as Service
    return randomAppointment

}

export const seederAppointments = async () => {

    generateAppointment()

    const appointments = Array.from({ length: 20 }, generateAppointment)

    await Appointment.save(appointments);


    console.log(`---------------------------`);
    console.log(`Appointments have been generated succesfully!`);
    console.log(`---------------------------`);
}