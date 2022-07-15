import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import { SchemaOf } from "yup";
import { ITicketCreate } from '../interfaces/ticket';

export const ticketSchema: SchemaOf<ITicketCreate> = yup.object().shape({
    user_id: yup.string().required()
});

export const validateTicketMiddleware = (schema: SchemaOf<ITicketCreate>) => async (req: Request, res: Response, next: NextFunction) => {
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