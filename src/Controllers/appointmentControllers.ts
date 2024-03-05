import { Request, Response } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const createAppointment = async (req: Request, res: Response) => {
    try {

        const service = req.body.service
        const id = req.tokenData.userID
        const date = req.body.date

        if (!service || !date) {
            return res.status(400).json({
                success: false,
                message: `Service or date invalid!`
            })
        }

        const newAppointment = new Appointment()
        newAppointment.appointmentDate = new Date(date)
        newAppointment.user = {
            id: id
        } as User
        newAppointment.service = {
            id: service
        } as Service
        await newAppointment.save()

        console.log(newAppointment);

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
        const appointmentID = req.body.appointmentID
        const service = req.body.service
        const id = req.tokenData.userID
        const date = req.body.date

        if (!service || !date || !appointmentID) {
            return res.status(400).json({
                success: false,
                message: `Service or date invalid!`
            })
        }

        const permited = await Appointment.findOne({
            where: {
                id: appointmentID,
                user: {
                    id: id
                }
            }
        })

        if (!permited) {
            return res.status(400).json({
                success: false,
                message: `You have no acces to this appointment: ${appointmentID}`
            })
        }

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
        const tokenId = req.tokenData.userID

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
        const appointmentID = Number(req.params.id)
        const tokenId = req.tokenData.userID
        console.log(req.params.id);




        if (isNaN(appointmentID) || req.params.id === null) {
            return res.status(400).json({
                success: false,
                message: `Appointment ID is not valid!`
            })
        }
        const appointment = await Appointment.findOne({
            where: {
                id: appointmentID,
                user: {
                    id: tokenId
                }
            }
        })

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

