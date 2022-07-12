import { Request, Response } from "express";
import AdressService from "../service/adress.service";

class AdressController {
  static async create(req: Request, res: Response) {
    try {
      const { number, street, complement, state, zip_code, country } = req.body;
      const newAdress = await AdressService.createAdress({
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
  }

  static async read(req: Request, res: Response) {
    try {
        const {id} = req.params
        const user = await AdressService.readAdress(id);
    
        return res.status(201).json(user);
      } catch (err) {
        if (err instanceof Error) {
          return res.status(401).send({
            error: err.name,
            message: err.message,
          });
        }
      }
  }

  static async update() {

  }

  static async delete(req: Request, res: Response) {
    try {
        const {id} = req.params

        const adress = await AdressService.deleteAdress(id);

        return res.status(200).json({ message: "Adress deleted" })

    } catch(err){
        if (err instanceof Error) {
            return res.status(401).send({
              error: err.name,
              message: err.message,
            });
          }
    }
  }
}

export default AdressController;
