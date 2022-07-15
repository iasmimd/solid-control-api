import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/user";

export const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export const validateUserLoginMiddleware = (schema: SchemaOf<IUserLogin>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    try {
      const validatedData = await schema.validate(
        data,
        {
          abortEarly: false,
          stripUnknown: true
        }
      )

      req.body = validatedData;
      next();

    } catch (error: any) {

      return res.status(400).json({
        "error": error.errors?.join(', ')
      })
    }
  } catch (error) {
    
    next(error)
  }
};