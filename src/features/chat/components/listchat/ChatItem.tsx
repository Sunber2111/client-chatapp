import { IMessageItem } from "app/models/message";
import {
  getContentMessageByConvId,
  setIdUserRecive,
} from "features/chat/chatSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { GridColumn, GridRow } from "semantic-ui-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface IProps {
  data: IMessageItem;
  isSelect?: Boolean;
}

const ChatItem: React.FC<IProps> = ({ data, isSelect }) => {
  const dispatch = useDispatch();

  const handleCLick = () => {
    dispatch(setIdUserRecive(data.userFriendId));
    dispatch(getContentMessageByConvId(data.conversationId));
  };

  const generateMessage = (
    isSend: Boolean,
    content: string,
    time?: string
  ): string => {
    const genTime = time ? time.split("T")[1].split(".")[0].split(":") : "";
    const finalTime = genTime ? genTime[0] + ":" + genTime[1] : "";
    const finalContent = content
      ? isSend
        ? content.slice(0, 20)
        : content.slice(0, 40)
      : "";
    return finalContent + " " + finalTime;
  };

  return (
    <GridRow>
      <GridColumn>
        <div className="wrap-chat-item">
          <div
            className={isSelect ? "chat-item chat-item-select" : "chat-item"}
            onClick={(e) => handleCLick()}
          >
            {!data.image ? (
              <AccountCircleIcon />
            ) : (
              <img src={data.image} alt="user-mess" />
            )}
            <div className="conv-info-content">
              <p className="username">{data.username}</p>
              <p className="content">
                {generateMessage(data.isSend, data.content, data.time)}
              </p>
            </div>
          </div>
        </div>
      </GridColumn>
    </GridRow>
  );
};

export default React.memo(ChatItem);
