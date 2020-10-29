import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import FriendNotVerifyItem from "../friendverifynotitem";
import "./styles.scss";

const ListFriendVerify = () => {
  const lisiFriendNotVerify = useSelector(
    (state: RootState) => state.nav.listFriendNotVerify
  );
  return (
    <div className="list-fri-ver">
      <p className="title">Lời Mời Kết Bạn 🎉🎉🎉</p>
      {lisiFriendNotVerify.map((val) => (
        <FriendNotVerifyItem
          birthday={val.birthday}
          email={val.email}
          sex={val.sex}
          key={val.friendId}
          userFriendId={val.userFriendId}
          username={val.username}
          friendId={val.friendId}
          image={val.image}
        />
      ))}
    </div>
  );
};

export default ListFriendVerify;
