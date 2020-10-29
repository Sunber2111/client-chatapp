export interface IAccount {
  namelogin: string;
  password: string;
}

export interface ICheckCurrentAccount {
  status: string;
  userId: string;
  image: string;
}

export interface ILogginSuccess {
  status: string;
  token: string;
  userId: string;
  image: string;
}
