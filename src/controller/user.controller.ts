import { Request, Response } from 'express';
import UsersServices from '../service/user.service';
import { instanceToPlain } from 'class-transformer';
import 'express-async-errors';

class UsersControllers {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const newUser = await UsersServices.createUserService({
      name,
      email,
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
    const id = req.params.id;

    const user = await UsersServices.retrieveUserService(id);

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
      const id = req.params.id;

      await UsersServices.updateUserService(id, req.body);

      return res.status(200).json({ message: "User updated!" });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    await UsersServices.deleteUserService(id);

    return res.status(200).send({ message: 'User deleted!' });
  }

  static async list(req: Request, res: Response) {
    const users = await UsersServices.listUsersService();

    return res.status(200).json(users);
  }
}

export default UsersControllers;
