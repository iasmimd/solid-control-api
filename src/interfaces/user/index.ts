export interface IUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    addres_id: string
    cart_id: string
}

export interface IUserCreate {
    name: string
    email: string
    password: string
}

export interface IUserLogin {
    email: string
    password: string
}