import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { TokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                succes: false,
                message: `token invalid!`
            })
        }

        const isTokenValid = jwt.verify(token, process.env.JWT_secret as string) as TokenData
        if (!isTokenValid){
            return res.status(400).json({
                succes: false,
                message: `token not valid`,
            })
        }
        req.tokenData = {
            userID:isTokenValid.userID,
            roleName: isTokenValid.roleName
        }
        // const decoded = jwt.decode(token)
        // req.tokenData = decoded as TokenData
    
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