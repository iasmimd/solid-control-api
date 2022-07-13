import { Request, Response } from "express";
import AddressService from "../service/address.service";

class AddressController {
  static async create(req: Request, res: Response) {
    try {
      const { number, street, complement, state, zip_code, country } = req.body;
      const newAddress = await AddressService.createAddress({
        number,
        street,
        complement,
        state,
        zip_code,
        country,
      });
      return res.status(201).send(newAddress);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const {id} = req.params
      const user = await AddressService.readAddress(id);
  
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

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const address = await AddressService.updateAddress(data, id);

      return res.json(address);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(401).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
        const {id} = req.params

        const address = await AddressService.deleteAddress(id);

        return res.status(200).json({ message: "Address deleted" })

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

export default AddressController;
