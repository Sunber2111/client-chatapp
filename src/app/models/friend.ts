export interface IFindFriend {
  id: string;
  username: string;
  isFriend: Boolean;
  image: string;
  isSend?: Boolean;
}

export interface IFriendNotVerify {
  friendId: string;
  username: string;
  image?: string;
  userFriendId: string;
  email?: string;
  sex?: Boolean;
  birthday?: string;
}

export interface IReciveInvitation {
  idUserSend: string;
  image?: string;
  username: string;
  friendId: string;
  isSend: Boolean;
}

export interface IAcceptFriend {
  birthday?: string;
  email?: string;
  image?: string;
  sex?: Boolean;
  username: string;
  _id: string;
  conversationId:string
}
