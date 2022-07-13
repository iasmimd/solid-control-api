import express, { Request, Response, NextFunction } from 'express';
import { appRoutes } from "./routers";
import { AppError, handleError } from "./errors/AppError";
import cors from "cors"
import * as path from "path"
const engines = require("consolidate");
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("../../client"));
app.engine("ejs", engines.ejs);
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");
appRoutes(app)

// app.use(handleError());

export default app;
