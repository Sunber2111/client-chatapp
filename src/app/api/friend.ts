import { IFindFriend, IFriendNotVerify } from "app/models/friend";
import request from "./agent";

const friendApi = {
  findByKeyword: (keyword: string): Promise<IFindFriend[]> =>
    request.get("friend/getbykeyword/" + keyword),
  getListNotVerify: (): Promise<IFriendNotVerify[]> =>
    request.get("/friend/getFriendNotVerify"),
  verifyFriend: (idFriend: string) =>
    request.post("/friend/verifyFriend", { idFriend }),
  unFriend: (idFriend: string) => request.get(`/friend/unfriend/${idFriend}`),
};

export default friendApi;
