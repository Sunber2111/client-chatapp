import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import { history } from "index";
import "./styles.scss";
import FormLogin from "./form";

const Login = () => {
  const isLoggedIn = useSelector((s: RootState) => s.login.isLoggedIn);

  if (isLoggedIn) history.push("/chat");

  return (
    <div className="login-page">
      <Grid>
        <GridRow>
          <GridColumn computer={11} className="wrap-cont">
            <div className="cont"></div>
            <p className="title-cont">MessDev</p>
            <p className="title-cont-sub">Đăng nhập để vào trang chủ 🎉🎉🎉</p>
          </GridColumn>
          <GridColumn computer={5}>
            <FormLogin />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

export default Login;
