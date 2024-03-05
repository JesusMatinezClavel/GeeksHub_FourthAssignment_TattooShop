import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

export const generateAppointment = () => {

    const randomAppointment = new Appointment()
    
    const startDate = new Date('2024-03-03');
    const endDate = new Date('2028-03-03');
    randomAppointment.appointmentDate = faker.date.between({from: startDate, to: endDate})

    randomAppointment.user = {
        id: faker.number.int({ min: 1, max: 20 })
    } as User
    randomAppointment.service = {
        id: faker.number.int({ min: 1, max: 5 })
    } as Service
    return randomAppointment

}

export const seederAppointments = async () => {

    const appointments = Array.from({ length: 10 }, generateAppointment)

    await Appointment.save(appointments);


    console.log(`---------------------------`);
    console.log(`Appointments have been generated succesfully!`);
    console.log(`---------------------------`);
}