import { Request, Response } from "express";

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