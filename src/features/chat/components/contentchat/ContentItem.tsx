import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface IProps {
  content: string;
  isSend: Boolean;
  image?: string;
}

const ContentItem: React.FC<IProps> = ({ content, isSend, image }) => {
  return (
    <div className="content-chat-item">
      {!isSend &&
        (image ? <img src={image} alt="img" /> : <AccountCircleIcon />)}
      <div
        className={isSend ? "chat-content chat-content-isSend" : "chat-content"}
      >
        {content}
      </div>
    </div>
  );
};

export default React.memo(ContentItem);
