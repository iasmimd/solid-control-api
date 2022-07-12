import { Request, Response } from "express";
import ProviderService from "../service/provider.service";

class ProviderController {
  static create = async (req: Request, res: Response) => {
    try {
      const newProvider = await ProviderService.create(req.body);

      return res.status(201).json(newProvider);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static list = async (req: Request, res: Response) => {
    try {
      const providers = await ProviderService.list();

      return res.status(200).json(providers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static readOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const provider = await ProviderService.readOne(id);

      return res.status(200).json(provider);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedProvider = await ProviderService.update(id, req.body);

      return res.status(200).json({ message: "Provider updated" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const provider = await ProviderService.delete(id);

      return res.status(200).json({ message: "Provider deleted with success" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };
}

export default ProviderController;
