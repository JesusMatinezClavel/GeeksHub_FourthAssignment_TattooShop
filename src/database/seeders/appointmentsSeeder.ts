import { AppDataSource } from "../db";




import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

const generateAppointment = async () => {
    try {
        await AppDataSource.initialize()

        const randomAppointment = new Appointment()
        const startDate = faker.date.soon()
        const endDate = faker.date.future()
        randomAppointment.appointmentDate = faker.date.between({ from: startDate, to: endDate })

        const users = await User.find({
            select: {
                id: true
            }
        })

        randomAppointment.user = faker.number.int({ min: 1, max: users.length })

        const serviceID = faker.number.int({ min: 6, max: 10 })
        const service = await Service.findOne({
            where: {
                id: serviceID
            }
        })
        if (!service) {
            console.error(`coudn't find the service: ${Service.name}`);
            return null;
        }

        const { id, ...restofit } = service
        randomAppointment.service = id

        return randomAppointment

    } catch (error) {

    } finally {
        await AppDataSource.destroy()
    }
}



export const seederAppointments = async () => {
    try {
        await AppDataSource.initialize()

        const appointmentPromises =  Array.from({ length: 1 }, generateAppointment)
        const appointments = await Promise.all(appointmentPromises)
        console.log(appointments);

        await Appointment.save(appointments)

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}