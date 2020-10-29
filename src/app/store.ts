import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import charReducer from "features/chat/chatSlice";
import loginReducer from "features/login/loginSlice";
import navReducer from "features/nav/navSlice";

const rootReducer = combineReducers({
  chat: charReducer,
  login: loginReducer,
  nav: navReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const appDispatch = store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
