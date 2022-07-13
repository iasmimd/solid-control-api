import { Request, Response } from 'express';
import UserService from '../service/userAdmin.service';

class UserController {
  static async createAdmin(req: Request, res: Response) {
    const { name, email, password, isAdm } = req.body;

    await UserService.createUserAdmin({ name, email, password, isAdm });

    return res.status(201).json({ name, email, password });
  }

  static async listUsers(req: Request, res: Response) {
    const users = await UserService.readUsersService();

    return res.status(200).json(users);
  }

  static async listOneUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserService.readOneUserService(id);

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const updatedUser = await UserService.updateUserService(id, req.body);

    return res.status(200).json({ message: 'User updated' });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserService.deleteUserService(id);

    return res.status(200).json({ message: 'User deleted with success!' });
  }
}

export default UserController;
