



export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  street: string;
  number: string;
  complement?: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAdminUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IAdminUserUpdate {
  name?: string;
  email?: string;
  password: string;
}
