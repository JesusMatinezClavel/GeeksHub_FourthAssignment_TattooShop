import { log } from "console";
import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Sacamos el role del usuario a través de req.tokenData
        const role = req.tokenData.roleName

        // Comparamos el valor con super_admin para asegurarnos de que el usuario tiene el role adecuado
        if (role !== 'super_admin') {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                }
            )
        }

        //En caso de que tenga el rol super_admin se procede con la siguiente función
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