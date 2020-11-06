import { IMessageReciveData } from "app/models/message";
import { appDispatch } from "../store";
import io from "socket.io-client";
import { addMessage, onAddUserChat } from "features/chat/chatSlice";
import { IMessageRecive } from "features/chat/types/message";
import { IAcceptFriend, IReciveInvitation } from "app/models/friend";
import { onAddNewItem } from "features/nav/navSlice";
import { IUserRecive } from "app/models/user";
const CHAT_URL = process.env.REACT_APP_CHAT_URL as string;
let myId: string = "";
let socket: SocketIOClient.Socket;

export const createMyRoom = (rooms: string) => {

  myId = rooms;
  console.log('create chat room');
  
  socket = io.connect(CHAT_URL);

  socket.on("new_msg", (data: IMessageReciveData) => {
    const payload: IMessageRecive = {
      content: data.content,
      idSend: data.idUserSend,
      idRecive: data.idUserRecive,
      isSend: myId === data.idUserSend ? true : false,
      conversationId: data.conversationId,
      image: data.image,
      username: data.username,
    };
    appDispatch(addMessage(payload));
  });

  socket.on("recive_invitation_friend", (data: IReciveInvitation) => {
    appDispatch(onAddNewItem(data));
  });

  socket.on("addNewUserToListChat", (user: IAcceptFriend) => {
    console.log(user);
    console.log(myId);

    appDispatch(
      onAddUserChat({
        content: "",
        conversationId: user.conversationId,
        isSend: false,
        userFriendId: user._id,
        username: user.username,
        birthday: user.birthday,
        email: user.email,
        image: user.image,
        sex: user.sex,
        time: "",
      })
    );
  });

  socket.emit("privatechatroom", rooms);
};

export const disconnectToServer = ()=>{
  socket.close()
}

export const sendMessage = (
  message: string,
  idUserSend: string,
  idUserRecive: string,
  conversationId: string,
  userRecive: IUserRecive
) => {
  socket.emit("sendMessage", {
    message,
    room: idUserRecive,
    idUserSend,
    idUserRecive,
    conversationId,
    image: userRecive.image,
    email: userRecive.email,
    sex: userRecive.sex,
    birthday: userRecive.birthday,
    username: userRecive.username,
  });
};

export const sendInvitationFriend = (
  idUserSend: string,
  idUserRecive: string
) => {
  socket.emit("sendInvitationFriend", {
    idUserSend,
    idUserRecive,
    room: idUserRecive,
  });
};

export const acceptFriend = (conversationId: string) => {
  socket.emit("acceptFriend", {
    conversationId,
  });
};
