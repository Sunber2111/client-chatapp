export interface IMessage {
  isSend: Boolean;
  content: string;
}

export interface IMessageRecive {
  idSend: string;
  isSend: Boolean;
  idRecive: string;
  content: string;
  conversationId: string;
  username?:string,
  image?:string,
}
