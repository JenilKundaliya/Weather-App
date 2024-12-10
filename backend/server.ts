import rootRouter from "./routes"
import express, { Express, NextFunction, Request, Response } from "express";
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 8001;


app.use(express.json())
app.use(cors())

//Root Router
app.use('/api/v1',rootRouter)

app.use("*", (req: Request, res: Response) => {
    res.status(502).send("Something went wrong!");
})

app.listen(PORT,
    () => {
        console.log("Server started on PORT:", PORT)
    }
);


