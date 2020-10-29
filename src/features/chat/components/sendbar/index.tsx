import { sendMessage } from "app/api/chat";
import { RootState } from "app/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icon, Input } from "semantic-ui-react";

const SendBar = () => {
  const [content, setContent] = useState("");

  const { userId } = useSelector((s: RootState) => s.login);

  const userSelect = useSelector((s: RootState) => s.chat.userSelect);

  const { idUserRecive, conversationId } = useSelector(
    (s: RootState) => s.chat
  );

  const handleSendMessage = () => {
    if (idUserRecive && conversationId) {
      sendMessage(content, userId, idUserRecive, conversationId, userSelect);
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (idUserRecive && conversationId) {
        sendMessage(content, userId, idUserRecive, conversationId, userSelect);
        setContent("");
      }
    }
  };

  return (
    <Input
      value={content}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
      onChange={(e) => setContent(e.target.value)}
      icon={
        <Icon
          onClick={() => handleSendMessage()}
          name="send"
          inverted
          circular
          link
        />
      }
      placeholder="Nhập tin nhắn ..."
    />
  );
};

export default SendBar;
