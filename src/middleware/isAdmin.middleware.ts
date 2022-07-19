import { Request, Response, NextFunction } from "express";

const isAdmUserMiddleware = (req: Request, res: Response, next: NextFunction) => {

  if (!req.user.isAdm) {
    return res.status(401).json({
      message: "User is not Admin"
    })
  }

  next();
}

export default isAdmUserMiddleware;