import AppExpress, {Express} from "express";
import userRouter from "./routers/users.router";

const app : Express = AppExpress()
const PORT : number = 3001

app.get("/", (req, res)=>{
    return res.send("Hola mundo")
})

app.use(userRouter)

// Middleware 404
app.use((req, res)=>{
    return res.status(404).json({
        success: false,
        message: '404 '
    })
})

app.listen(PORT, ()=>{
    console.log(`API Lost-Found en ejecución: http://localhost:${PORT}`);
})
