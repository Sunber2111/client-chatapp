import { findFriendByKeyword } from "features/chat/chatSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";

const SearchBar = () => {
  const [state, setstate] = useState("");

  const dispatch = useDispatch()
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        dispatch(findFriendByKeyword(state));
    }
  };

  return (
    <div className="search-input">
      <Input
        placeholder="Nhập tên cần tìm..."
        value={state}
        onChange={(e) => setstate(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
      />
    </div>
  );
};

export default React.memo(SearchBar);
