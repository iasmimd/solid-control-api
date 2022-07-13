import { Request, Response } from 'express';
import AddressService from '../service/address.service';

class AddressController {
  static async create(req: Request, res: Response) {
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
  }

  static async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await AddressService.readAddress(id);

    return res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const address = await AddressService.updateAddress(data, id);

    return res.json(address);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const address = await AddressService.deleteAddress(id);

    return res.status(200).json({ message: 'Address deleted' });
  }
}

export default AddressController;
