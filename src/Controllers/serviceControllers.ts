import { tr } from "@faker-js/faker";
import { Request, Response } from "express";
import { Service } from "../models/Service";


export const getAllServices = async (req: Request, res: Response) => {
    try {
        const tokenID = req.tokenData.userID

        const allServices = await Service.find({})

        res.status(200).json({
            success: true,
            message: `All services called succesfully!`,
            services: allServices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Cannot get any service`,
            error: error
        })
    }
}


export const createNewService = async (req: Request, res: Response) => {
    try {

        const service = req.body.serviceName.trim()
        const description = req.body.description.trim()

        if (!service.trim() || !description.trim()) {
            return res.status(400).json({
                success: false,
                message: `service or description not valid!`
            })
        }

        const newService = new Service()
        newService.serviceName = service
        newService.description = description

        if (!newService) {
            return res.status(400).json({
                success: false,
                message: `New service invalid!`
            })
        }

        const serviceName = await Service.findOne({
            where: {
                serviceName: newService.serviceName,
            }
        })

        if (serviceName) {
            return res.status(400).json({
                success: false,
                message: `Service ${newService.serviceName} already exists!`
            })
        }

        const serviceDescription = await Service.findOne({
            where: {
                description: newService.description
            }
        })

        if (serviceDescription) {
            return res.status(400).json({
                success: false,
                message: `The description already exists!`
            })
        }



        await Service.save(newService)

        res.status(200).json({
            success: true,
            message: `New service created!`,
            service: newService
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Cannot get any service`,
            error: error
        })
    }
}


