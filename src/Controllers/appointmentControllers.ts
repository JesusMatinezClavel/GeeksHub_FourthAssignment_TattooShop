import { Request, Response } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        // Cogemos los datos del req.body y el req.tokenData
        const service = req.body.service
        const id = req.tokenData.userID
        // Convertimos req.body.date en un DATE
        const date = new Date(req.body.date)
        // Creamos un Date con la fecha actual
        const currentDate = new Date()

        // Validamos los datos obtenidos por el body
        if (!service || !date) {
            return res.status(400).json({
                success: false,
                message: `Service or date invalid!`
            })
        }
        // Validamos que la fecha elegida no sea anterior a la fecha actual
        if (date < currentDate) {
            return res.status(400).json({
                success: false,
                message: `${date} is not a valid date!`
            })
        }

        // Creamos una nueva Appointment
        const newAppointment = new Appointment()
        newAppointment.appointmentDate = new Date(date)
        newAppointment.user = {
            id: id
        } as User
        newAppointment.service = {
            id: service
        } as Service
        await newAppointment.save()


        res.status(200).json({
            success: true,
            message: `Mew appointment created!`,
            data: newAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `cannot create new appointment`,
            error: error
        })
    }
}

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        // Cogemos los datos del req.body y el req.tokenData
        const appointmentID = req.body.appointmentID
        const service = req.body.service
        const id = req.tokenData.userID
        const date = req.body.date

        // Validamos los datos obtenidos por el body
        if (!service || !date || !appointmentID) {
            return res.status(400).json({
                success: false,
                message: `Service or date invalid!`
            })
        }

        // Llamamos al Appointment si coinciden en el ID y el user_id
        const permited = await Appointment.findOne({
            where: {
                id: appointmentID,
                user: {
                    id: id
                }
            }
        })

        // Validamos que esa Appointment exista
        if (!permited) {
            return res.status(400).json({
                success: false,
                message: `You have no acces to this appointment: ${appointmentID}`
            })
        }

        // Actualizamos la Appointment
        await Appointment.update(
            {
                id: appointmentID,
                user: {
                    id: id
                }

            },
            {
                appointmentDate: date,
                service: service
            }
        )

        // Llamamos a la Appointment actualizada para mostrarla por el Response
        const newAppointment = await Appointment.findOne({
            where: {
                id: appointmentID
            }
        })

        res.status(200).json({
            success: true,
            message: `appointment updated!`,
            data: newAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `cannot create new appointment`,
            error: error
        })
    }
}

export const getAppointments = async (req: Request, res: Response) => {
    try {
        // Cogemos el id de req.tokenData
        const tokenId = req.tokenData.userID

        // Llamamos a todas las Appointments que tengan ese user_id
        const appointments = await Appointment.find({
            where: {
                user: {
                    id: tokenId
                }
            },
            relations: {
                service: true
            },
            select: {
                appointmentDate: true,
                service: {
                    serviceName: true
                }
            }
        })

        res.status(200).json({
            success: true,
            message: `Appointments called succesfully!`,
            data: appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `cannot create new appointment`,
            error: error
        })
    }
}

export const getAppointmentsById = async (req: Request, res: Response) => {
    try {
        // Cogemos los datos del req.params y el req.tokenData 
        const appointmentID = Number(req.params.id)
        const tokenId = req.tokenData.userID

        // Validamos los datos obtenidos por el req.params
        if (isNaN(appointmentID) || req.params.id === null) {
            return res.status(400).json({
                success: false,
                message: `Appointment ID is not valid!`
            })
        }

        // Llamamos a la Appointment que coincida con el ID y el user_id
        const appointment = await Appointment.findOne({
            where: {
                id: appointmentID,
                user: {
                    id: tokenId
                }
            }
        })

        // Validamos que la Appointment exista
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: `You don't have acces to this appointment: ${appointmentID}`
            })
        }

        res.status(200).json({
            success: true,
            message: `Appointment: ${appointmentID} called succesfully!`,
            data: appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `cannot call appointment`,
            error: error
        })
    }
}

