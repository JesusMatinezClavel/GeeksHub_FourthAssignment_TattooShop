import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

export const generateAppointment = () => {

    const randomAppointment = new Appointment()
    // const startDate = faker.date.recent()
    // const endDate = faker.date.future()
    
    const usedDates: Set<string> = new Set();
    
    const startDate = new Date('2024-03-03');
    const endDate = new Date('2025-03-03');

    function generateRandomDate(a: Date, b: Date): Date {
        while (true) {
            const randomDate: Date = faker.date.between({from: a, to: b});
            const date: string = randomDate.toISOString().split('T')[0];

            if (!usedDates.has(date)) {
                usedDates.add(date);
                return randomDate;
            }
        }
    }
    const uniqueRandomDate = generateRandomDate(startDate, endDate);
    randomAppointment.appointmentDate = uniqueRandomDate

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