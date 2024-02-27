// Importamos las interfaces Request y Response para poder comunicarnos con el servidor
import { Request, Response } from "express";
import { role } from "../models/role";

// Exportamos cada una de las constantes para poder utilizarlas directamente en las rutas declaradas en app.ts
// Les añadimos try/catch para manejar los errores
// Les añadimos 'async' para poder llamar a las entities a través de los métodos de BaseEntity
export const getRoles = async (req: Request, res: Response) => {
    try {
        res.status(200).json(
            {
                succes: true,
                message: `Roles called succesfully`
            }
        )
    } catch {
        res.status(501).json(
            {
                succes: false,
                message: `failed to connect`
            }
        )

    }
}
export const createRoles = async (req: Request, res: Response) => {
    const roleBody = req.body.role
    try {
        const roleIn = await role.create({
            name: roleBody
        }).save()
        res.status(201).json(
            {
                succes: true,
                message: `Role: ${roleBody} -> created succesfully`,
                data: roleIn
            }
        )
    } catch (error) {
        console.log(error);
        res.status(501).json(
            {
                succes: false,
                message: `failed to connect`,
                error: error
            }
        )

    }
}
export const updateRoles = async (req: Request, res: Response) => {
    try {
        res.status(200).json(
            {
                succes: true,
                message: `Roles updated succesfully`
            }
        )
    } catch {
        res.status(501).json(
            {
                succes: false,
                message: `failed to connect`
            }
        )

    }

}
export const deleteRoles = async (req: Request, res: Response) => {
    try {
        res.status(200).json(
            {
                succes: true,
                message: `Roles deleted succesfully`
            }
        )
    } catch {
        res.status(501).json(
            {
                succes: false,
                message: `failed to connect`
            }
        )

    }

}