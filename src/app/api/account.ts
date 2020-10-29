import { IAccount, ICheckCurrentAccount, ILogginSuccess } from "app/models/account";
import request from "./agent";

const accountApi = {
  login: (data: IAccount):Promise<ILogginSuccess> => request.post("account/login", data),
  getCurrent: (): Promise<ICheckCurrentAccount> =>
    request.get("user/getcurrent"),
};

export default accountApi;
