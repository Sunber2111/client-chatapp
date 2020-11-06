import React, { useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import "./styles.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import SearchBar from "./searchbar";
import friendApi from "app/api/friend";
import ListFriendVerify from "./components/listfriendverify";
import { onAddToListFriendNotVerify } from "./navSlice";
import { logoutAccount, setNewImage } from "features/login/loginSlice";
import imageApi from "app/api/image";
import { IAddImageSuccess } from "./type/image";
import { NavLink } from "react-router-dom";
import { clearAllState } from "features/chat/chatSlice";
import { disconnectToServer } from "app/api/chat";

const Navigation = () => {
  const { image } = useSelector((s: RootState) => s.login);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(!open ? event.currentTarget : null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAccount());
    dispatch(clearAllState());
    disconnectToServer();
  };

  const handleFileInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let tgt = evt.target;
    let files = tgt.files;
    if (FileReader && files && files[0]) {
      const file = files[0];
      let p = new Promise(function (resolve) {
        let reader = new FileReader();
        reader.onload = function () {
          let code = reader.result + "";
          resolve(code);
        };
        reader.readAsDataURL(file);
      });

      p.then((elem) => {
        imageApi.sendImage(elem + "").then((res: IAddImageSuccess) => {
          dispatch(setNewImage(res.imageUrl));
        });
      });
    }
  };

  const [fileInputState, setFileInputState] = useState("");

  useEffect(() => {
    friendApi
      .getListNotVerify()
      .then((res) => {
        dispatch(onAddToListFriendNotVerify(res));
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="nav">
      <div className="title">
        <NavLink to="/chat">MessDev </NavLink>
      </div>

      <SearchBar />
      <div className="icons">
        {image ? (
          <>
            <img src={image} alt="img" />
            <label htmlFor="file-upload" className="custom-file-upload">
              Đổi ảnh đại diện
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
            />
          </>
        ) : (
          <>
            <div className="wrap-icon">
              <AccountCircleIcon />
            </div>
            <label htmlFor="file-upload" className="custom-file-upload">
              Đổi ảnh đại diện
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
            />
          </>
        )}
        <div className="wrap-icon" onClick={handleClick}>
          <NotificationsIcon />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <ListFriendVerify />
          </Popover>
        </div>
        <div className="wrap-icon" onClick={(e) => handleLogout()}>
          <ExitToAppIcon />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navigation);
