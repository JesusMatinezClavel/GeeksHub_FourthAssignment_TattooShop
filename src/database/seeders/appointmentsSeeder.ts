import { AppDataSource } from "../db";




import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

export const generateUsers = async () => {
    try {
        await AppDataSource.initialize()

        const randomAppointment = new Appointment()
        const startDate = faker.date.soon()
        const endDate = faker.date.future()
        randomAppointment.appointmentDate = await faker.date.between({ from: startDate, to: endDate })

        const users = await User.find({
            select: {
                id: true
            }
        })

        randomAppointment.user = faker.number.int({ min: 1, max: users.length })

        const services = await Service.find({
            select: {
                id: true
            }
        })
        const serviceID = faker.number.int({ min: (services.length - (services.length - 1)), max: services.length })
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

        console.log(randomAppointment)

        return randomAppointment

    } catch (error) {

    } finally {
        await AppDataSource.destroy()
    }
}



// export const seederAppointments = async () => {
//     try {
//         await AppDataSource.initialize()

//         generateAppointment()


//         // const appointmentPromises = Array.from({ length: 1 }, generateAppointment)
//         // const appointments = await Promise.all(appointmentPromises)

//         // await Appointment.save

//     } catch (error) {
//         console.log(error)
//     } finally {
//         await AppDataSource.destroy()
//     }
// }

export const seederAppointments = async () => {
    try {
        await AppDataSource.initialize()


        const appointments = Array.from({ length: 17 }, generateUsers)

        await Appointment.save(appointments)

        console.log(`---------------------------`);
        console.log(`test users have been generated succesfully!`);
        console.log(`---------------------------`);

        return appointments

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}