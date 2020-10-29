import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import ListChatBody from "./ListChatBody";
import ListChatHeader from "./ListChatHeader";
import "./styles.scss";

const ListChat = () => {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return (
    <div className="list-chat">
      <ListChatHeader />
      <ListChatBody data={chats} />
    </div>
  );
};

export default React.memo(ListChat);
