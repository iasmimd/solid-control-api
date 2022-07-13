import { Request, Response } from "express";
import UsersServices from "../service/user.service";
import { instanceToPlain } from "class-transformer";
import "express-async-errors";
import { AppError, handleError } from "../errors/AppError";

class UsersControllers {
    static createUserController = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await UsersServices.createUserService({name, email, password});

            return res.status(201).json(instanceToPlain(newUser))
        
        } catch (error) {
            if (error instanceof AppError) {
                handleError(error, res)
            }
        }
    }

    static loginUserController = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const token = await UsersServices.loginUserService({email, password});

            return res.status(200).json({token})

        } catch (error) {
            if (error instanceof AppError) {
                handleError(error, res)
            }
        }
    }

    static retrieveUserController = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const user = await UsersServices.retrieveUserService(id);

            return res.status(200).json(user)

        } catch (error) {
            if (error instanceof AppError) {
                handleError(error, res)
            }
        }
    }

    static updateUserController = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updatedUser = await UsersServices.updateUserService(id, req.body);

            return res.status(200).json(instanceToPlain(updatedUser))

        } catch (error) {
            if (error instanceof AppError) {
                handleError(error, res)
            }
        }
    }

    static deleteUserController = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await UsersServices.deleteUserService(id)

            return res.status(200).send({message: "User deleted!"})

        } catch (error) {
            if (error instanceof AppError) {
                handleError(error, res)
            }
        }
    }

}
export default UsersControllers;