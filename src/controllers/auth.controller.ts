import { Request, Response } from "express";
import { JwtService } from "../business/services/jwt.service";
import { MongoService } from "../business/services/mongo.service";
import { ResponseModel } from "../business/models/response.model";

const jwtService = new JwtService()
const collection = "users"

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(email);
    console.log(password);  
    const responseModel = new ResponseModel(true, "Consulta exitosa", [])
    try {
        const mongoService = new MongoService()
        const user = await mongoService.getUserByCredentials(collection, email, password)
        responseModel.info = user
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar usuarios"
        return res.send(responseModel)
    }
}