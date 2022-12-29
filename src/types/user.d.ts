interface IUser {
  username: string;
  email: string;
  password: string;
}

interface IResponseLocals {
  user: string;
  id: number;
}

export { IUser, IResponseLocals };
