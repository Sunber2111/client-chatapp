import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import FriendItem from "./FriendItem";

const ListFriend = () => {
  const listFriendSearch = useSelector(
    (state: RootState) => state.chat.listFriendSearch
  );

  return (
    <div className="list-fri">
      {listFriendSearch.map((fri) => (
        <FriendItem
          id={fri.id}
          isSend={fri.isSend}
          isFriend={fri.isFriend}
          username={fri.username}
          image={fri.image}
        />
      ))}
    </div>
  );
};

export default ListFriend;
