import { Request, Response } from "express";
import UserService from "../service/userAdmin.service";

class UserController {

  static async createAdmin(req: Request, res: Response) {
    try {

      const { name, email, password, isAdm } = req.body
      
      await UserService.createUserAdmin({ name, email, password, isAdm });

      return res.status(201).json({ name, email, password });

    } catch (error) {
      
      if ( error instanceof Error) {

        return res.status(400).json({
          message: error.message,
        })
      }
    }
  }

  static async listUsers (req: Request, res: Response) {
    try {
      const users = await UserService.readUsersService();

      return res.status(200).json(users);

    } catch (error) {
      if (error instanceof Error) {

        return res.status(400).json({
          message: error.message
        })
      }
    }
  }

  static async listOneUser (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.readOneUserService(id);
  
      return res.status(200).json(user);

    } catch (error) {
      if (error instanceof Error) {

        return res.status(400).json({
          message: error.message
        })
      }
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updatedUser = await UserService.updateUserService(id, req.body);
  
      return res.status(200).json({ message: 'User updated' });

    } catch (error) {
      if (error instanceof Error) {
        
        return res.status(400).json({
          message: error.message
        })
      }
    }
  }

  static async delete (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUserService(id);
  
      return res.status(200).json({ message: 'User deleted with success!' });

    } catch (error) {
      if (error instanceof Error) {

        return res.status(400).json({
          message: error.message
        })
      }
    }
  }
}

export default UserController;