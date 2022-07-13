
export interface IUser {
    id: string
    name: string
    email: string
    password: string
    address_id: string
    cart_id: string
}

export interface IUserCreate {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUserLogin {
    email: string
    password: string
}
export interface IAdminUser {
  name: string,
  email: string,
  password: string,
  isAdm: boolean
}