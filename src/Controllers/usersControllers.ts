// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";
import { TokenData } from "../types";
// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const getAllUsers = await User.find({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true,
                role: {
                    id: true,
                    rolename: true
                }
            }
        })
        res.status(200).json(
            {
                succes: true,
                message: 'users called succesfully',
                data: getAllUsers
            }
        )
    } catch (error) {

        res.status(500).json(
            {
                succes: true,
                message: 'fatal error!'
            }
        )
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userID = req.tokenData.userID
        const getAllUsers = await User.find({
            where: {
                id: userID
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true,
                role: {
                    id: true,
                    rolename: true
                }
            }
        })
        res.status(200).json(
            {
                succes: true,
                message: 'user called succesfully',
                data: getAllUsers
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                succes: true,
                message: 'fatal error!'
            }
        )
    }
}


export const createUsers = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: 'users created succesfully'
        }
    )
}
export const updateUsers = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: 'users updated succesfully'
        }
    )
}
export const deleteUsers = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: 'users deleted succesfully'
        }
    )
}