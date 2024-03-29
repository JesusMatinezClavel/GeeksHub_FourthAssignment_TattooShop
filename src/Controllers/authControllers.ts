import bcrypt, { hash, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";

export const registration = async (req: Request, res: Response) => {
    try {
        // Sacamos los valores a intrudocir desde el req.body
        const name = req.body.firstName.trim()
        const lastName = req.body.lastName.trim()
        const password = req.body.passwordHash.trim()
        const email = req.body.email.trim()

        // Validamos que los datos obtenidos sean válidos
        if (!name || !lastName || !password || !email) {
            return res.status(400).json({
                success: false,
                message: `An error ocurred`,
            })
        }

        // Validamos la longitud de la contraseña
        if (password.length > 10 || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: `password ${password} not valid`,
            })
        }

        // Validamos el formato de la contraseña según nuestro criterio (una mayúscula, una minúscula y un número)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json(
                {
                    successs: false,
                    message: "password has to be 6-10 long and have an upper, a lower-case and a number"
                }
            )
        }

        // Validamos el formato del email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    successs: false,
                    message: "format email invalid"
                }
            )
        }

        // Encriptamos la contraseña
        const encryptedPassword = bcrypt.hashSync(password, 8)

        // Creamos el nuevo user con la contraseña encriptada
        const newUser = await User.create({
            firstName: name,
            lastName: lastName,
            passwordHash: encryptedPassword,
            email: email
        }).save()

        const {passwordHash,...restUser} = newUser as User
        // Mostramos el nuevo usuario creado por la response
        res.status(200).json({
            success: true,
            message: `New user created: ${name} ${lastName}`,
            data: restUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `User cannot be registered`,
            error: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // Sacamos los valores a intrudocir desde el req.body
        const email = req.body.email.trim()
        const password = req.body.password.trim()


        // Validamos que los datos obtenidos sean válidos
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                message: `email or password invalid!`,
            })
        }

        // Validamos el formato de la contraseña según nuestro criterio (una mayúscula, una minúscula y un número)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json(
                {
                    successs: false,
                    message: "password has to be 6-10 long and have an upper, a lower-case and a number"
                }
            )
        }

        // Validamos el formato del email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    successs: false,
                    message: "format email invalid"
                }
            )
        }

        // Llamamos a un usuario a partir del email
        const user = await User.findOne(
            {
                where: {
                    email: email
                },
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    email: true,
                    passwordHash: true,
                    role: {
                        id: true,
                        rolename: true
                    }
                }
            }
        );

        // Confirmamos si el usuario existe
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `The email: ${email} doesn't exist!`
            })
        }

        // Validamos que la contraseña coincida
        const isValidPassword = bcrypt.compareSync(password, user!.passwordHash)
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: `The password is incorrect!`
            })
        }
        // Creamos el token a través del package JsonWebToken 
        // Le vinculamos los valores del user.id(user?.id) con el user.role.rolename (user?.role)
        const token = jwt.sign({
            userID: user?.id,
            roleName: user?.role.rolename
        },
            process.env.JWT_secret as string,
            { expiresIn: '2h' })

        const {passwordHash,...restUser} = user as User

        // Mostramos por response el usuario logeado y el token creado
        res.status(200).json({
            success: true,
            message: `Logged in successfully!`,
            data: restUser,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `User cannot log in`,
            error: error
        })
    }
}