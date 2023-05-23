import { Router } from "express";
import { createObject, deleteObject, getObjects, getOneObject, updateObject } from "../controllers/objects.controller";

const objectRouter: Router = Router()

objectRouter.get("/objects", getObjects)
    .get("/objects/:id", getOneObject)
    .post("/objects", createObject)
    .put("/objects/:id", updateObject)
    .delete("/objects/:id", deleteObject)

export default objectRouter;