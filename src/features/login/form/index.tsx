import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { login } from "../loginSlice";
import { Input } from "semantic-ui-react";
import "./styles.scss";
const FormLogin = () => {
  const [namelogin, setNamelogin] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(login({ namelogin, password }));
  };

  return (
    <div className="form-login">
      <p className="form-login-title">Tên Đăng Nhập</p>
      <Input value={namelogin} onChange={(e) => setNamelogin(e.target.value)} />
      <p className="form-login-title">Mật Khẩu</p>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button color="twitter" onClick={(e) => handleClick()}>
        Đăng nhập
      </Button>
      <div className='clear'></div>
      <p>Bạn Chưa có tài khoản ?</p>
      <Button basic color='grey'>
        Đăng ký
      </Button>
    </div>
  );
};

export default FormLogin;
