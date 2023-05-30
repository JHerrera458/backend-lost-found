import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { MongoService } from "../business/services/mongo.service";
import { BCrypt } from "../business/services/bcrypt.service";

const collection = "users"
const bcrypt = new BCrypt()

export const getUsers = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", [])
    try {
        const service = new MongoService()
        const users: any[] = await service.getItems(collection)
        responseModel.info = users
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar usuarios"
        return res.send(responseModel)
    }
}

export const getOneUser = (req: Request, res: Response) => {
    return res.send("GET ONE User")
}

export const createUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", [])
    try {
        const user = req.body
        const passHash = bcrypt.createHash(user.password)
        user.password = passHash

        const userInfo = {...user}
        delete userInfo.password

        const service = new MongoService()
        if (user) {
            const response = await service.insertItem(collection, user)
            responseModel.info = response
            return res.send(responseModel)
        } else {
            responseModel.ok = false
            responseModel.message = "Bad Request"
            return res.status(400).send(responseModel)
        }
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Faltan campos obligatorios"
        return res.status(400).send(responseModel)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", [])
    try {
        const user = req.body
        const { id } = req.params
        const service = new MongoService()
        if (user) {
            const response = await service.updateItem(collection, user, id)
            responseModel.info = response
            return res.send(responseModel)
        } else {
            responseModel.ok = false
            responseModel.message = "Bad Request"
            return res.status(400).send(responseModel)
        }
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al modificar un usuario"
        return res.send(responseModel)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", [])
    try {
        const { id } = req.params
        const service = new MongoService()
        const response = await service.deleteItem(collection, id)
        responseModel.info = response
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al modificar un usuario"
        return res.send(responseModel)
    }
}