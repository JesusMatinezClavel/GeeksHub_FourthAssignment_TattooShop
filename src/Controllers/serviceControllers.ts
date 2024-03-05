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
        res.status(200).json({
            success: true,
            message: `All services called succesfully!`,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Cannot get any service`,
            error: error
        })
    }
}


