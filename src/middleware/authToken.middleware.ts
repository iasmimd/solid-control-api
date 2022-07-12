import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export const authToken = async(req:Request,res:Response,next:NextFunction) => {
  const token = req.headers.authorization
    token?.split(" ")[1]

    jwt.verify(token as string, process.env.SECRET_KEY as string,(err:any,decoded:any)=>{
        if(err){
            throw new AppError(401,"Token to not exists")
        }
        if (err) {
            throw new AppError(401, "Invalid Token");
          }
          req.userEmail = decoded.email;
          next();
    })

}