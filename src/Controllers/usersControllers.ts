// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const email = req.query.email
        if (email) {
            const email = req.query.email
            const getUser = await User.findOne({
                // Filtramos por nuestro propio id
                where: {
                    email: email?.toString()
                },
                // Seleccionamos las relaciones a mostrar
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
            if (!getUser) {
                return res.status(400).json(
                    {
                        succes: false,
                        message: `User doesn't exist`
                    }
                )
            }

            res.status(200).json(
                {
                    succes: true,
                    message: 'user called succesfully',
                    data: getUser
                }
            )
        } else {
            let limit = Number(req.query.limit) || 5
            const page = Number(req.query.page) || 1
            const skip = (page - 1) * limit
            const lengUsers = await User.find()

            if (limit <= 0 || page <= 0 || !Number.isInteger(limit) || !Number.isInteger(page)) {
                return res.status(400).json({
                    succes: false,
                    message: `Limit or page selected are not valid`
                })
            }
            if (limit > 20) {
                limit = 20
            }
            if (skip >= lengUsers.length) {
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
        }

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
        const id = req.tokenData.userID
        console.log(id);

        const ownUser = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: id
            },
            // Seleccionamos las relaciones a mostrar
            relations: {
                role: true
            },
            // Seleccionamos los datos a mostrar
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true
            }
        })

        res.status(200).json(
            {
                success: true,
                message: 'Got own profile succesfully',
                data: ownUser
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: true,
                message: 'fatal error!',
                error: error
            }
        )
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const userID = parseInt(req.params.id)
        if (userID <= 0 || !Number.isInteger(userID) || isNaN(userID)) {
            return res.status(500).json(
                {
                    succes: false,
                    message: 'ID not valid'
                }
            )
        }

        const user = await User.findOne({
            where: {
                id: userID
            }
        })
        if (!user) {
            return res.status(400).json(
                {
                    succes: true,
                    message: `User: ${userID} doesn't exist`
                }
            )
        }

        await User.delete(userID)


        res.status(200).json(
            {
                succes: true,
                message: `User: ${userID} has been deleted!`
            }
        )
    } catch (error) {

        res.status(500).json(
            {
                succes: false,
                message: `can't delete users`
            }
        )
    }
}

export const updateOwnProfile = async (req: Request, res: Response) => {
    try {
        const id = req.tokenData.userID


        let firstName = req.body.firstName.trim()
        let lastName = req.body.lastName.trim()
        let email = req.body.email.trim()
        let password = bcrypt.hashSync(req.body.password.trim(), 8)
        const ownProfile = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: id
            },
            // Seleccionamos las relaciones a mostrar
            relations: {
                role: true
            },
            // Seleccionamos los datos a mostrar
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true
            }
        })

        if (req.body.firstName === "") {
            firstName = ownProfile?.firstName
        }
        if (req.body.lastName === "") {
            lastName = ownProfile?.lastName
        }
        if (req.body.email === "") {
            email = ownProfile?.email
        }
        if (req.body.password === "") {
            password = ownProfile!.passwordHash
        }

        await User.update(
            {
                id: id
            },
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                passwordHash: password
            }
        )
        const updatedProfile = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: id
            },
            // Seleccionamos las relaciones a mostrar
            relations: {
                role: true
            },
            // Seleccionamos los datos a mostrar
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true
            }
        })

        res.status(200).json(
            {
                succes: true,
                message: `Profile updated succesfully!`,
                data: ownProfile,
                data2: updatedProfile
            }
        )
    } catch (error) {

        res.status(500).json(
            {
                succes: true,
                message: `Profile cannot update`,
                error: error
            }
        )
    }
}

export const updateRoles = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const role = req.body.id

        if (id === null || role === null || isNaN(id) || isNaN(role) || id <= 0 || role <= 0 || !Number.isInteger(id) || !Number.isInteger(role)) {
            return res.status(200).json(
                {
                    succes: false,
                    message: `id or role invalid!`,
                }
            )
        }

        await User.update(
            {
                id: id
            }, {
            role: {
                id: role
            }
        })

        const updatedRole = await User.findOne({
            // Filtramos por nuestro propio id
            where: {
                id: id
            },
            // Seleccionamos las relaciones a mostrar
            relations: {
                role: true
            },
            // Seleccionamos los datos a mostrar
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                passwordHash: true
            }
        })

        res.status(200).json(
            {
                succes: true,
                message: `Profile updated succesfully!`,
                data2: updatedRole
            }
        )
    } catch (error) {

        res.status(500).json(
            {
                succes: true,
                message: `Profile cannot update`,
                error: error
            }
        )
    }
}