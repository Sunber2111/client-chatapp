import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Label } from "semantic-ui-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { history } from "index";
import { sendInvitationFriend } from "app/api/chat";
import { RootState } from "app/store";
import { useSelector } from "react-redux";

interface IProps {
  isFriend: Boolean;
  username: string;
  image?: string;
  isSend?: Boolean;
  id: string;
}

const FriendItem: React.FC<IProps> = ({
  isFriend,
  username,
  image,
  isSend,
  id,
}) => {
  const [stateIsSend, setstateIsSend] = useState(isSend ? isSend : false);
  const handleMessage = () => {
    history.push("/chat");
  };

  const userId = useSelector((state: RootState) => state.login.userId);

  const handleAddFriend = () => {
    sendInvitationFriend(userId, id);
    setstateIsSend(true);
  };

  return (
    <Paper>
      <div className="fri-item">
        {image ? <img src={image} alt="img" /> : <AccountCircleIcon />}
        <div className="cont">
          <p className="title">{username}</p>
          <p className="status">{isFriend ? "Bạn Bè" : "Chưa Kết Bạn"}</p>
        </div>
        {stateIsSend ? (
          <Label
            content="Đã Gửi Lời Mời Kết Bạn Vui Lòng Chờ"
            color="grey"
            basic
          />
        ) : isFriend ? (
          <Button color="twitter" onClick={(e) => handleMessage()}>
            Nhắn tin
          </Button>
        ) : (
          <Button color="green" onClick={(e) => handleAddFriend()}>
            kết bạn
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default FriendItem;
