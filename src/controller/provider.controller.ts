import { Request, Response } from 'express';
import ProviderService from '../service/provider.service';

class ProviderController {
  static create = async (req: Request, res: Response) => {
    const newProvider = await ProviderService.create(req.body);

    return res.status(201).json(newProvider);
  };

  static list = async (req: Request, res: Response) => {
    const providers = await ProviderService.list();

    return res.status(200).json(providers);
  };

  static readOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const provider = await ProviderService.readOne(id);

    return res.status(200).json(provider);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedProvider = await ProviderService.update(id, req.body);

    return res.status(200).json({ message: 'Provider updated' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const provider = await ProviderService.delete(id);

    return res.status(200).json({ message: 'Provider deleted with success' });
  };
}

export default ProviderController;
