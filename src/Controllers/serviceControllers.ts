import { tr } from "@faker-js/faker";
import { Request, Response } from "express";
import { Service } from "../models/Service";


export const getAllServices = async (req: Request, res: Response) => {
    try {
        // Llamamos a todos los servicios para mostrarlos por el Response
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
        // Cogemos los valores del req.body
        const service = req.body.serviceName.trim()
        const description = req.body.description.trim()

        // Validamos los valores obtenidos
        if (!service.trim() || !description.trim()) {
            return res.status(400).json({
                success: false,
                message: `service or description not valid!`
            })
        }

        // Creamos un nuevo Service a partir de dichos valores
        const newService = new Service()
        newService.serviceName = service
        newService.description = description

        // Comprobamos que el nuevo servicio sea válido
        if (!newService) {
            return res.status(400).json({
                success: false,
                message: `New service invalid!`
            })
        }

        // Validamos si name o description coinciden con los de los Services ya creados
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

        // Creamos el nuevo servicio
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

export const updateService = async (req: Request, res: Response) => {
    try {
        // Cogemos los valores del req.body y el req.params.id
        const serviceID = req.params.id
        let name = req.body.serviceName.trim()
        let description = req.body.description.trim()
        
        // Validamos que los datos sean correctos
        if (!serviceID || !name || !description) {
            return res.status(400).json({
                success: false,
                message: `name or description not valid!`,
            })
        }

        // Llamamos al servicio sin actualizar
        const service = await Service.findOne({
            where: {
                id: Number(serviceID)
            }
        })

        // Validamos los datos obtenidos para que si están vacíos no actualicen nada
        if (name === ""){
            name = service?.serviceName
        }
        if (description === ""){
            description = service?.description
        }

        // Validamos si el Service existe
        if(!service){
            return res.status(400).json({
                success: false,
                message: `Service doesn't exist!`,
            })
        }

        // Actualizamos el Service
        await Service.update(
            {
                id: Number(serviceID)
            },
            {
                serviceName: name,
                description: description
            }
        )
       
        // Llamamos al Service actualizado para mostrarlo por Response
        const serviceUpdated = await Service.findOne({
            where: {
                id: Number(serviceID)
            }
        })

        res.status(200).json({
            success: true,
            message: `Service updated!`,
            service: serviceUpdated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Cannot update the service`,
            error: error
        })
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        // Cogemos el id de req.params.id
        const serviceID = req.params.id

        // Llamamos al Service a eliminar
        const service = await Service.findOne({
            where: {
                id: Number(serviceID)
            }
        })

        // Validamos si el Service existe
        if(!service){
            return res.status(400).json({
                success: false,
                message: `The service ${serviceID} doesn't exist!`,
            })
        }

        // Eliminamos el Service
        await Service.delete(serviceID)

        res.status(200).json({
            success: true,
            message: `Service deleted!`,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Cannot delete the service`,
            error: error
        })
    }
}
