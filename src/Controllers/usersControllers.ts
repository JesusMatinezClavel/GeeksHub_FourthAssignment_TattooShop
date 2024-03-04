// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";
import { TokenData } from "../types";
// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        let limit = Number(req.query.limit) || 5
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const lengUsers = await User.find()

        if (limit <= 0 || page <= 0 ) {
            return res.status(400).json({
                succes: false,
                message: `Limit or page selected are not valid`
            })
        }
        if (limit > 20) {
            limit = 20
        }
        if (skip > lengUsers.length) {
            return res.status(400).json({
                succes: false,
                message: `There are no more users to call`
            })
        }

        // Llamamos a todos los usuarios
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
            },
            take: limit,
            skip: skip
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
        // Cogemos el userID del tokenData para utilizarlo como filtro para buscar el perfil propio
        const userID = req.tokenData.userID
        const getAllUsers = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: userID
            },
            // Seleccionamos los datos a mostrar
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


export const getOwnProfile = async (req: Request, res: Response) => {
    try {
        // Cogemos el userID del tokenData para utilizarlo como filtro para buscar el perfil propio
        const userID = req.tokenData.userID
        const getAllUsers = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: userID
            },
            relations: {
                role: true
            },
            // Seleccionamos los datos a mostrar
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