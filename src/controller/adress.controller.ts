import { Request, Response } from "express";
import createAdressService from "../service/adress.service";

const adressCreateController = async (req: Request, res: Response) => {
  try {
    const { number, street, complement, state, zip_code, country } = req.body;
    const newAdress = await createAdressService({
      number,
      street,
      complement,
      state,
      zip_code,
      country,
    });
    return res.status(201).send(newAdress);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default adressCreateController;
