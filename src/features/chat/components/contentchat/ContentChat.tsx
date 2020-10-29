import { RootState } from "app/store";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ContentItem from "./ContentItem";
import "./styles.scss";

const ContentChat = () => {
  const contentChat = useSelector((state: RootState) => state.chat.contentChat);

  const imageRecive = useSelector(
    (state: RootState) => state.chat.userSelect.image
  );

  let messagesEndRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const scrollToBottom = () => {
    messagesEndRef!.current!.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesEndRef, scrollToBottom]);

  return (
    <div className="content-chat">
      {contentChat.map((contChat, index) => (
        <ContentItem
          image={imageRecive}
          content={contChat.content}
          isSend={contChat.isSend}
          key={index}
        />
      ))}
      <div id={"messagesEndRef"} ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(ContentChat);
