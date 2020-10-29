import React from "react";
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((s: RootState) => s.login.isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
