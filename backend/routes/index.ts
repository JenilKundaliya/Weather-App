import { Request, Response } from "express";
import weatherRouter from "./weather.routes";

const { Router } = require("express");

const rootRouter = Router();

//weather routes
rootRouter.use("/weather",weatherRouter)

rootRouter.use("/", (req: Request, res: Response) => {
  res.status(404).send("Route not defined");
});

export default rootRouter;