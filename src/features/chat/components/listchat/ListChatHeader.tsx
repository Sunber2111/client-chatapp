import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";

const ListChatHeader = () => {
  const { image } = useSelector((state: RootState) => state.login);

  return (
    <div className="header">
      {image && <img src={image} alt="img" />}
      <p className="title">Chat</p>
    </div>
  );
};

export default React.memo(ListChatHeader);
