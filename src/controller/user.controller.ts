import { Request, Response } from 'express';
import UsersServices from '../service/user.service';
import { instanceToPlain } from 'class-transformer';
import 'express-async-errors';

class UsersControllers {
  static async create(req: Request, res: Response) {
    const {
      name,
      email,
      street,
      number,
      complement,
      state,
      zip_code,
      city,
      password,
    } = req.body;

    const newUser = await UsersServices.createUserService({
      name,
      email,
      street,
      number,
      complement,
      state,
      zip_code,
      city,
      password,
    });

    return res.status(201).json(instanceToPlain(newUser));
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UsersServices.loginUserService({ email, password });

    return res.status(200).json(token);
  }

  static async retrieve(req: Request, res: Response) {
    const id = req.user.id;
    const user = await UsersServices.retrieveUserService(id);

    return res.status(200).json(instanceToPlain(user));
  }

  static async update(req: Request, res: Response) {
    const id = req.user.id;
    await UsersServices.updateUserService(id, req.body);

    return res.status(200).json({ message: 'User updated!' });
  }

  static async delete(req: Request, res: Response) {
    const id = req.user.id;
    await UsersServices.deleteUserService(id);

    return res.status(200).send({ message: 'User deleted!' });
  }

  static async list(req: Request, res: Response) {
    const users = await UsersServices.listUsersService();

    return res.status(200).json(instanceToPlain(users));
  }
}
export default UsersControllers;
