import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { MongoService } from "../business/services/mongo.service";

const collection = "objects"

export const getObjects = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", [])
    try {
        const service = new MongoService()
        const Objects: any[] = await service.getItems(collection)
        responseModel.info = Objects
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar objetos"
        return res.send(responseModel)
    }
}

export const getOneObject = (req: Request, res: Response) => {
    return res.send("GET ONE Object")
}

export const createObject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", [])
    try {
        const Object = req.body
        const service = new MongoService()
        if (Object) {
            const response = await service.insertItem(collection, Object)
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
        responseModel.message = "Error al crear objeto"
        return res.send(responseModel)
    }
}

export const updateObject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", [])
    try {
        const Object = req.body
        const { id } = req.params
        const service = new MongoService()
        if (Object) {
            const response = await service.updateItem(collection, Object, id)
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
        responseModel.message = "Error al modificar un objeto"
        return res.send(responseModel)
    }
}

export const deleteObject = async (req: Request, res: Response) => {
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
        responseModel.message = "Error al modificar un objeto"
        return res.send(responseModel)
    }
}