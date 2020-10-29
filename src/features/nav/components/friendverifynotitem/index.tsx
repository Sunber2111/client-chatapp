import friendApi from "app/api/friend";
import { IFriendNotVerify } from "app/models/friend";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import "./styles.scss";
import { onAcceptFriend, removeFriend } from "../../navSlice";
import { showError, showMessage } from "app/notifycation/notify";
import { onAddUserChat } from "features/chat/chatSlice";
import { acceptFriend } from "app/api/chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const FriendNotVerifyItem: React.FC<IFriendNotVerify> = (props) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    friendApi
      .verifyFriend(props.friendId)
      .then((res) => {
        acceptFriend(props.friendId);
        dispatch(onAcceptFriend(props.friendId));
        showMessage("🚀 Thêm Thành Công, Bây giờ các bạn đã là bạn bè");
        dispatch(
          onAddUserChat({
            content: "",
            conversationId: props.friendId,
            isSend: false,
            userFriendId: props.userFriendId,
            username: props.username,
            birthday: props.birthday,
            email: props.email,
            image: props.image,
            sex: props.sex,
            time: "",
          })
        );
      })
      .catch((err) => {
        showError("Thêm Thất Bại");
      });
  };

  const handleUnfriend = () => {
    friendApi.unFriend(props.friendId).then((res) => {
      dispatch(removeFriend(props.friendId));
    });
  };

  return (
    <>
      <div className="fri-ver">
        {props.image ? (
          <img src={props.image} alt="logo" />
        ) : (
          <AccountCircleIcon />
        )}
        <div>
          <p>{props.username}</p>
        </div>
        <div className="wrap-btn">
          <Button
            color="twitter"
            content="Chấp Nhận"
            onClick={(e) => handleAccept()}
          />
          <Button color="red" content="Xóa" onClick={(e) => handleUnfriend()} />
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default React.memo(FriendNotVerifyItem);
