import { AppDataSource } from "../db";
import { Appointment } from "../../models/Appointment"
import { faker } from "@faker-js/faker";
import { Service } from "../../models/Service";
import { User } from "../../models/User";

export const generateAppointment = async () => {
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
    const serviceID = await faker.number.int({ min: (services.length - (services.length - 1)), max: services.length })
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
}

export const seederAppointments = async () => {
    try {
        await AppDataSource.initialize()
        let appointments = []
        for (let i = 0; i < 2; i++) {
            const generatedAppointment = generateAppointment();
            if (generatedAppointment) {
                appointments.push(generatedAppointment);
            }
        }
        console.log(appointments);
        

        // // Guardar las citas en la base de datos
        // await Appointment.save(appointments);


        console.log(`---------------------------`);
        console.log(`Appointments have been generated succesfully!`);
        console.log(`---------------------------`);
        await AppDataSource.destroy()
    } catch (error) {
        console.log(error)
    }
}