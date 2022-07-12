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
}

export default UserService;