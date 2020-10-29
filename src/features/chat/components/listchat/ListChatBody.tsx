import { IMessageItem } from "app/models/message";
import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import ChatItem from "./ChatItem";

interface IProps {
  data: IMessageItem[];
}

const ListChatBody: React.FC<IProps> = ({ data }) => {
  const idUserRecive = useSelector(
    (state: RootState) => state.chat.idUserRecive
  );

  return (
    <Grid className="list-chat-content">
      {data.map((val) => (
        <ChatItem
          data={val}
          key={val.conversationId}
          isSelect={idUserRecive === val.userFriendId}
        />
      ))}
    </Grid>
  );
};

export default React.memo(ListChatBody);
