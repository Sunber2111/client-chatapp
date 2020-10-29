import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { IUserRecive } from "app/models/user";

const UserInfo = () => {
  const [state, setstate] = useState<IUserRecive>({
    username: "",
    birthday: "",
    email: "",
    image: "",
    sex: false,
  });

  const { idUserRecive, userSelect } = useSelector((s: RootState) => s.chat);

  useEffect(() => {
    if (idUserRecive) {
      setstate(userSelect);
    }
  }, [idUserRecive, userSelect]);

  return (
    <div className="user-info">
      {state.image ? (
        <img src={state.image} alt="logo" />
      ) : (
        <AccountCircleIcon />
      )}
      <p className="username">{state.username}</p>
      <div className="user-info-sub">
        <p className="sub">Email </p>
        <p className="content">{state.email}</p>
      </div>
      <div className="user-info-sub">
        <p className="sub">Ngày Sinh </p>
        <p className="content">{state.birthday?.split("T")[0]}</p>
      </div>
      <div className="user-info-sub">
        <p className="sub">Giới Tính </p>
        <p className="content">{state.sex ? "Nam" : "Nữ"}</p>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
