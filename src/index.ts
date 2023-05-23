import AppExpress, { Express } from "express";
import cors from "cors"
import userRouter from "./routers/users.router";
import objectRouter from "./routers/objects.router";
import authRouter from "./routers/auth.router";

const app: Express = AppExpress()
const PORT: number = 3001

app.use(cors())
app.use(AppExpress.json())

app.get("/", (req, res) => {
    return res.send("Hola mundo")
})

app
    .use(authRouter)
    .use(userRouter)
    .use(objectRouter)

// Middleware 404
app.use((req, res) => {
    return res.status(404).json({
        ok: false,
        message: '404 PATH no encontrado'
    })
})

app.listen(PORT, () => {
    console.log(`API Lost-Found en ejecución: http://localhost:${PORT}`);
})
