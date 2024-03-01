import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/User";

export const registration = async (req: Request, res: Response) => {
    try {
        const name = req.body.firstName.trim()
        const lastName = req.body.lastName.trim()
        const password = req.body.passwordHash.trim()
        const email = req.body.email.trim()
        console.log(name, lastName, password, email)

        // Validamos que los datos obtenidos sean válidos
        if (!name || !lastName || !password || !email) {
            return res.status(400).json({
                succes: false,
                message: `An error ocurred`,
            })
        }

        // Validamos la longitud de la contraseña
        if (password.length > 10 || password.length < 6) {
            return res.status(400).json({
                succes: false,
                message: `password ${password} not valid`,
            })
        }

        // Validamos el formato del email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }


        const encryptedPassword = bcrypt.hashSync(password, 8)

        const newUser = await User.create({
            firstName: name,
            lastName: lastName,
            passwordHash: encryptedPassword,
            email: email
        }).save()

        res.status(200).json({
            succes: true,
            message: `New user created: ${name} ${lastName}`,
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: `User cannot be registered`,
            error: error
        })
    }
}