import { Request, Response } from "express";
import UserService from "../service/user.service";

class UserController {

  static userAdmin = async (req: Request, res: Response) => {

    try {

      const { name, email, password, isAdm } = req.body
      
      await UserService.createUserAdmin({ name, email, password, isAdm });

      return res.status(200).json({ name, email, password });

    } catch (error) {
      
      if ( error instanceof Error) {

        return res.status(400).json({
          message: error.message,
        })
      }
    }
  }
}

export default UserController;