import { log } from "console";
import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.tokenData.roleName
        if (role!=='super_admin') {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                }
            )
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