import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";


export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(400, "No token found");
  }

  jwt.verify(
    token as string,
    String(process.env.SECRET_KEY) ,
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Invalid Token");
      }
      req.user = {
        id: decoded.id,
        email: decoded.email,
        isAdm:decoded.isAdm
    }

      next();
    }
  );
};
