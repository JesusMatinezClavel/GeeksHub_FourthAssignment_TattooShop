// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";

// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
export const getRoles = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: `Roles called succesfully`
        }
    )
}
export const createRoles = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: `Roles created succesfully`
        }
    )
}
export const updateRoles = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: `Roles updated succesfully`
        }
    )
}
export const deleteRoles = (req: Request, res: Response) => {
    res.status(200).json(
        {
            succes: true,
            message: `Roles deleted succesfully`
        }
    )
}