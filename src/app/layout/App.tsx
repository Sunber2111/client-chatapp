import Chat from "features/chat";
import Login from "features/login";
import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import accountApi from "app/api/account";
import {
  checkCurrentFail,
  checkCurrentSuccess,
} from "features/login/loginSlice";
import { history } from "index";
import LoadingComponent from "./LoadingComponent";
import "./styles.scss";
import Navigation from "features/nav";
import Friend from "features/friend";
import PrivateRoute from "./PrivateRoute";
import { createMyRoom } from "app/api/chat";

const App: React.FC<RouteComponentProps> = () => {
  const  appLoaded = useSelector((s: RootState) => s.login.appLoaded);

  const dispath = useDispatch();

  useEffect(() => {
    accountApi
      .getCurrent()
      .then((value) => {
        dispath(
          checkCurrentSuccess({ userId: value.userId, image: value.image })
        );

        createMyRoom(value.userId);
      })
      .catch((err) => {
        dispath(checkCurrentFail());
        history.push("/");
      });
  }, []);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <div id="app">
      <Route path="/" component={Login} exact={true} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navigation />
            <Switch>
              <PrivateRoute component={Chat} path="/chat" />
              <PrivateRoute component={Friend} path="/friend" />
            </Switch>
          </Fragment>
        )}
      />
      <ToastContainer />
    </div>
  );
};

export default withRouter(App);
