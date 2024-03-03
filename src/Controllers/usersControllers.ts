// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";
import { FindOperator, Like } from "typeorm";
import bcrypt from "bcrypt";

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

        const firstName = () => {
            let update
            if (req.body.firstName !== "" && req.body.firstName !== getOwnUser?.firstName) {
                console.log(`First name updated to: ${req.body.firstName}`);
                update = req.body.firstName
            } else {
                update = getOwnUser?.firstName
            }
            return update
        }
        const lastName = () => {
            let update
            if (req.body.lastName !== "") {
                console.log(`Last name updated to: ${req.body.lastName}`);
                update = req.body.lastName
            } else {
                update = getOwnUser?.lastName
            }
            return update
        }
        const email = () => {
            let update
            if (req.body.email !== "") {
                console.log(`Email updated to: ${req.body.email}`);
                update = req.body.email
            } else {
                update = getOwnUser?.email
            }
            return update
        }
        const password = () => {
            let update
            if (req.body.password !== "") {
                console.log(`Password updated to: ${req.body.password}`);
                update = req.body.password
            } else {
                update = getOwnUser?.passwordHash
            }
            return update
        }


        await User.update({ id: getOwnUser?.id }, {
                firstName: firstName(),
                lastName: lastName(),
                email: email(),
                passwordHash: password()
        },
        )

        const getUpdatedUser = await User.findOne({
            where: {
                id: userID
            }
        })



        res.status(200).json(
            {
                succes: true,
                message: 'user updated succesfully',
                data: getOwnUser,
                data2: getUpdatedUser
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