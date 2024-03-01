import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { TokenData } from "../types";

export const auth = (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                succes: false,
                message: `token invalid!`
            })
        }

        const isTokenValid = jwt.verify(token, process.env.JWT_secret as string) as TokenData

        req.tokenData = {
            userID: isTokenValid.userID,
            userRole: isTokenValid.userRole
        }

        next()
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: `fatal error!`,
            error: error
        })
        return
    }
}