import { AppDataSource } from "../data-source";
import { AdminUser } from "../entities/userAdmin.entity";
import { IAdminUser, IAdminUserUpdate, IUserLogin } from "../interfaces/user";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from '../errors/AppError';

class AdminService {

  static async createUserAdmin ({ name, email, password, isAdm = true }: IAdminUser ): Promise<AdminUser> {

    if (!name || !email || !password) {
      throw new AppError(400, "Can not be empty")
    }
    const adminRepository = AppDataSource.getRepository(AdminUser);

    const newAdmin = adminRepository.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdm: isAdm
    })

    await adminRepository.save(newAdmin);

    return newAdmin;
  }

  static async loginAdminService({ email, password }: IUserLogin) {
    const adminRepository = AppDataSource.getRepository(AdminUser);

    const user = await adminRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError(403, "Invalid credentials");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(403, "Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        isAdm: user.isAdm,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "12h",
      }
    );

    return token;
  }

  static async readUsersService(): Promise<AdminUser[]> {

    const userRepository = AppDataSource.getRepository(AdminUser);
  
    const users = await userRepository.find();
  
    return users;
  }

  static async readOneUserService(id: string) {

    const userRepository = AppDataSource.getRepository(AdminUser);
  
    const user = await userRepository.findOneBy({ id });
  
    return user;
  }

  static async updateUserService(id: string, data: IAdminUserUpdate) {

    const userRepository = AppDataSource.getRepository(AdminUser);
  
    const user = await userRepository.findOneBy({ id });
  
    const updatedUser = await userRepository.update(user!.id, {
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10)
    })
  
    return updatedUser;
  }

  static async deleteUserService(id: string) {

    const useRepository = AppDataSource.getRepository(AdminUser);
  
    const user = await useRepository.findOneBy({ id });
  
    const deletedUser = await useRepository.delete(user!.id);
  
    return deletedUser;
  }
}

export default AdminService;