import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCreate } from "../interfaces/user";

export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string(),
  state: yup.string().required(),
  zip_code: yup.string().required(),
  country: yup.string().required(),
});

export const validateUserCreateMiddleware =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;

        next();
      } catch (error: any) {
        return res.status(400).json({
          error: error.errors?.join(", "),
        });
      }
    } catch (error) {
      next(error);
    }
  };
