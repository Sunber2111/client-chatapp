import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import store from "app/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
