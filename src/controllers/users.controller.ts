import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    return res.send("GET Users")
}

export const createUser = (req: Request, res: Response) => {
    return res.send("CREATE User")
}

export const updateUser = (req: Request, res: Response) => {
    return res.send("UPDATE User")
}

export const deleteUser = (req: Request, res: Response) => {
    return res.send("DELETE User")
}