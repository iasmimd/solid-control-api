import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

const isAdmUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(400, "No token found");
  }

  jwt.verify(
    token as string,
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Invalid Token");
      }
      req.user = {
        id: decoded.id,
        email: decoded.email,
        isAdm: decoded.isAdm,
      };
      if (!decoded.isAdm) {
        throw new AppError(401, "Access denied");
      }
      next();
    }
  );
};

export default isAdmUserMiddleware;

function newFunction(
  token: string | undefined,
  res: Response<any, Record<string, any>>
) {
  if (!token) {
    res.status;
  }
}
