import { Request, Response } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const createAppointment = async (req: Request, res: Response) => {
    try {

        const service = req.body.service
        const id = req.tokenData.userID
        const date = req.body.date

        if(!service||!date){
            return res.status(400).json({
                success: false,
                message:`Service or date invalid!`
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
            // data: newAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `cannot create new appointment`,
            error: error
        })
    }
}