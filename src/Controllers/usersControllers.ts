// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const email = req.query.email
        // Comprobamos si existe un email introducido en el Query
        if (email) {
            // Si existe ejecutamos la función para llamar al User al que pertenezca ese email
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
            // Comprobamos que el User existe
            if (!getUser) {
                return res.status(400).json(
                    {
                        succes: false,
                        message: `User doesn't exist`
                    }
                )
            }

            const { passwordHash, ...restUser } = getUser as User
            res.status(200).json(
                {
                    succes: true,
                    message: 'user called succesfully',
                    data: restUser
                }
            )
            // Si no existe un email en el Query ejecutamos la función para llamar a todos los Users
        } else {
            // Ponemos un límite a elegir en el Query (siendo este 5 si no se especifica)
            let limit = Number(req.query.limit) || 5
            // Ponemos la página que queremos ver (siendo esta la 1 si no se especifica)
            const page = Number(req.query.page) || 1
            // Hacemos un cálculo por el cual podemos elegir los Users a mostrar dependiendo del limit
            const skip = (page - 1) * limit
            const lengUsers = await User.find()

            // Hacemos validaciones a estos 3 valores para asegurarnos de que son valores válidos
            if (limit <= 0 || page <= 0 || !Number.isInteger(limit) || !Number.isInteger(page)) {
                return res.status(400).json({
                    succes: false,
                    message: `Limit or page selected are not valid`
                })
            }
            // El límite máximo será 20
            if (limit > 20) {
                limit = 20
            }
            // Si Skip sobrepasa la cantidad de Users dará un error
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

        const { passwordHash, ...restUser } = ownUser as User
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
        // Cogemos el id de req.params.id para utilizarlo como filtro para buscar el perfil a borrar
        const userID = parseInt(req.params.id)

        // Validamos el id
        if (userID <= 0 || !Number.isInteger(userID) || isNaN(userID)) {
            return res.status(500).json(
                {
                    succes: false,
                    message: 'ID not valid'
                }
            )
        }

        // Filtramos el User por el id
        const user = await User.findOne({
            where: {
                id: userID
            }
        })

        // Validamos que el User exista
        if (!user) {
            return res.status(400).json(
                {
                    succes: true,
                    message: `User: ${userID} doesn't exist`
                }
            )
        }

        // Borramos el User
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
        // Cogemos el userID del tokenData para utilizarlo como filtro para buscar el perfil propio
        const id = req.tokenData.userID

        // Cogemos los valores del req.body
        let firstName = req.body.firstName.trim()
        let lastName = req.body.lastName.trim()
        let email = req.body.email.trim()
        let password = bcrypt.hashSync(req.body.password.trim(), 8)

        // Llamamos a nuestro propio perfil SIN actualizar
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

        // Validamos los valores de req.body para que si no se introduce ninguno no se actualice nada
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

        // Actualizamos nuestro perfil
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

        // Llamamos al perfil actualizado para mostrarlo en el response
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
        // Cogemos el id de req.params.id para utilizarlo como filtro para buscar el perfil a actualizar
        const id = Number(req.params.id)
        // Cogemos el role_id desde el req.body
        const role = req.body.id

        // Validamos los datos 
        if (id === null || role === null || isNaN(id) || isNaN(role) || id <= 0 || role <= 0 || !Number.isInteger(id) || !Number.isInteger(role)) {
            return res.status(200).json(
                {
                    succes: false,
                    message: `id or role invalid!`,
                }
            )
        }

        // Actualizamos el role_id del User
        await User.update(
            {
                id: id
            }, {
            role: {
                id: role
            }
        })

        // Llamamos al User actualizado para mostrarlo en el Response
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