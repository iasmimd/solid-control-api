import { AppDataSource } from "../data-source";
import { AdminUser } from "../entities/userAdmin.entity";
import { IAdminUser } from "../interfaces/user";
import bcrypt from "bcrypt";

class UserService {

  static createUserAdmin = async ({ name, email, password, isAdm = true }: IAdminUser ): Promise<AdminUser> => {

    const userRepository = AppDataSource.getRepository(AdminUser);

    const newAdmin = userRepository.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdm: isAdm
    })

    if (newAdmin === null) {
      throw new Error("error")
    }

    await userRepository.save(newAdmin);

    return newAdmin;
  }

  static async listUsersService(): Promise<AdminUser[]> {

    const userRepository = AppDataSource.getRepository(AdminUser);
  
    const users = await userRepository.find();
  
    return users;
  }

  static async listOneUserService(id: string) {

    const userRepository = AppDataSource.getRepository(AdminUser);
  
    const user = await userRepository.findOneBy({ id });
  
    return user;
  }

  static async updateUserService(id: string, data: any) {

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

export default UserService;