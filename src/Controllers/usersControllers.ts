// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";

// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Llamamos a todos los usuarios
        const getAllUsers = await User.find({
            relations: {
                role: true
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true,
                role: {
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

export const getOwnProfile = async (req: Request, res: Response) => {
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

export const updateOwnProfile = async (req: Request, res: Response) => {
    try {
        // Cogemos el userID del tokenData para utilizarlo como filtro para buscar el perfil propio
        const userID = req.tokenData.userID
        const getOwnUser = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: userID
            }
        })
        console.log(getOwnUser);
                
        const updateOwnUser = await User.update({id: getOwnUser?.id},{lastName: req.body.lastName},)
        console.log(updateOwnUser);
        

        res.status(200).json(
            {
                succes: true,
                message: 'user called succesfully',
                data: updateOwnUser
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
            message: req.query

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