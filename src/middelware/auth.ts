import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { TokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Sacamos el token generado en el login
        // Lo tratamos para sacar unicamente el token, ya que req.headers.authorization añade "header " al princpio del token
        // De esta manera separamos ambas palabras en un array ['header ',token] y nos quedamos con el index [1]
        const token = req.headers.authorization?.split(" ")[1]

        // Confirmamos si el token existe
        if (!token) {
            return res.status(401).json({
                succes: false,
                message: `token invalid!`
            })
        }

        // Verificamos el token utilizando el secreto incluído en .env y lo asignamos como tokenData
        const isTokenValid = jwt.verify(token, process.env.JWT_secret as string) as TokenData
        // Validamos que el jwt.verify sea true
        if (!isTokenValid){
            return res.status(400).json({
                succes: false,
                message: `token not valid`,
            })
        }

        // Asignamos estos valores al req.tokenData
        req.tokenData = {
            userID:isTokenValid.userID,
            roleName: isTokenValid.roleName
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