export interface IMessageReciveData {
  idUserSend: string;
  idUserRecive: string;
  content: string;
  image?: string;
  conversationId: string;
  email?: string;
  sex?: Boolean;
  birthday?: string;
  username?: string;
}

export interface IMessageItem {
  username: string;
  userFriendId: string;
  isSend: Boolean;
  content: string;
  conversationId: string;
  time?: string;
  image?: string;
  email?: string;
  sex?: Boolean;
  birthday?: string;
}

export interface IMessageContent {
  isSend: Boolean;
  time: Date;
  content: string;
}

export interface IResponseGetMessageContent {
  conversationId: string;
  messageContent: IMessageContent[];
}
