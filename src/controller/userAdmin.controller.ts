import { Request, Response } from 'express';
import AdminService from '../service/userAdmin.service';

class AdminController {
  static async createAdmin(req: Request, res: Response) {
    const { name, email, password, isAdm } = req.body;

    await AdminService.createUserAdmin({ name, email, password, isAdm });

    return res.status(201).json({ name, email });
  }

  static async login(req: Request, res: Response) {

    const { email, password } = req.body;
    
    const token = await AdminService.loginAdminService({ email, password });

    return res.status(200).json({ token });
  }

  static async listUsers(req: Request, res: Response) {
    const users = await AdminService.readUsersService();

    return res.status(200).json(users);
  }

  static async listOneUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await AdminService.readOneUserService(id);

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    await AdminService.updateUserService(id, req.body);

    return res.status(204).json({ message: 'User updated' });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await AdminService.deleteUserService(id);

    return res.status(204).json({ message: 'User deleted with success!' });
  }
}

export default AdminController;