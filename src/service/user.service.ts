import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";
import { IUserCreate, IUserLogin } from "../interfaces/user";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Cart } from "../entities/cart.entity";

class UsersServices {
  static async createUserService({
    name,
    email,
    street,
    number,
    complement,
    state,
    zip_code,
    city,
    password,
  }: IUserCreate) {
    const usersRepository = AppDataSource.getRepository(User);
    const cartRepository = AppDataSource.getRepository(Cart);
   
      const users = await usersRepository.find();

    const emailExists = users.find((el) => el.email === email);

    if (emailExists) {
      throw new AppError(409, "E-mail already exists!");
    }

    const cart = new Cart();
    cart.subtotal = 0;

    cartRepository.create(cart);
    await cartRepository.save(cart);

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.number = number;
    newUser.street = street;
    newUser.complement = complement || "";
    newUser.state = state;
    newUser.city = city;
    newUser.zip_code = zip_code ;
    newUser.password = bcrypt.hashSync(password, 10);
    newUser.cart = cart;

    const createdUser = usersRepository.create(newUser);
    await usersRepository.save(createdUser);
    return createdUser;
  }

  static async loginUserService({ email, password }: IUserLogin) {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError(403, "Invalid credentials");
    }

    if (!user.active) {
      throw new AppError(401, "Inactive user");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(403, "Invalid credentials");
    }
    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdm: user.isAdm,
      },
      String(process.env.SECRET_KEY),
      {
        expiresIn: "12h",
      }
    );

    return { token };
  }

  static async retrieveUserService(id: string) {
    const usersRepository = AppDataSource.getRepository(User);
    const users = await usersRepository.find();
    const userFound = users.find((el) => el.id === id);

    if (!userFound) {
      throw new AppError(404, "User not found");
    }

    // FINALIZAR NO PROXIMO PR
    
    // if (userFound.id !== id && !userFound.isAdm) {
    //   throw new AppError(401, "Access denied");
    // }

    return userFound;
  }

  static async updateUserService(id: string, data: IUserCreate) {
    const usersRepository = AppDataSource.getTreeRepository(User);
    const users = await usersRepository.find();
    const userFound = users.find((el) => el.id === id);

    if (!userFound) {
      throw new AppError(404, "User not found");
    }

    const user = await usersRepository.update(userFound!.id, data);

    if (user.affected === 1) {
      const userUpdated = await usersRepository.findOneBy({ id: id });
      return userUpdated;
    }
  }

  static async deleteUserService(id: string) {
    const usersRepository = AppDataSource.getRepository(User);
    const userFound = await usersRepository.findOneBy({ id: id });

    if (!userFound) {
      throw new AppError(404, "User not found");
    }

    if (!userFound.active) {
      throw new Error("Inactivated user");
    }

    userFound.active = false;
    await usersRepository.save(userFound);
  }

  static async listUsersService(): Promise<User[]> {
    const usersRepository = AppDataSource.getRepository(User);
    const users = await usersRepository.find();

    return users;
  }
}

export default UsersServices;
