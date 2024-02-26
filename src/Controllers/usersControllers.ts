import { Request, Response } from "express";

export const getUsers = (req:Request,res:Response)=>{
    res.status(200).json(
        {
            succes: true,
            message: 'users called succesfully'
        }
    )
}
export const createUsers = (req:Request,res:Response)=>{
    res.status(200).json(
        {
            succes: true,
            message: 'users created succesfully'
        }
    )
}
export const updateUsers = (req:Request,res:Response)=>{
    res.status(200).json(
        {
            succes: true,
            message: 'users updated succesfully'
        }
    )
}
export const deleteUsers = (req:Request,res:Response)=>{
    res.status(200).json(
        {
            succes: true,
            message: 'users deleted succesfully'
        }
    )
}