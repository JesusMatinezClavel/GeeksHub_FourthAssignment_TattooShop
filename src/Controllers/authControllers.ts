import { Request, Response } from "express";

export const registration = (req: Request, res: Response) =>{
    try {
        const name = req.body.firstName
        const lastName = req.body.lastName
        const password = req.body.password
        const email = req.body.email
        console.log(name,lastName,password,email)
        
        res.status(200).json({
            succes: true,
            message: `New user created`,
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: `server has failed`,
            error: error
        })
    }
}