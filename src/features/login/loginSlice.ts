import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorFromServer } from "app/models/error";
import accountApi from "app/api/account";
import { IAccount, ILogginSuccess } from "app/models/account";
import { showError } from "app/notifycation/notify";
import { createMyRoom } from "app/api/chat";

type LoginState = {
  isLoggedIn: Boolean;
  appLoaded: Boolean;
  userId: string;
  image?: string;
};

const initialState: LoginState = {
  isLoggedIn: false,
  appLoaded: false,
  userId: "",
  image: "",
};

export const login = createAsyncThunk(
  "login/userlogin",
  async (account: IAccount, { rejectWithValue }) => {
    try {
      const data = await accountApi.login(account);
      createMyRoom(data.userId)
      return data;
    } catch (error) {
      let err = error as IErrorFromServer;
      showError(err.description);
      return rejectWithValue(err);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkCurrentSuccess(
      state,
      { payload }: PayloadAction<{ userId: string; image: string }>
    ) {
      state.userId = payload.userId;
      state.appLoaded = true;
      state.isLoggedIn = true;
      state.image = payload.image;
    },
    checkCurrentFail(state) {
      window.localStorage.removeItem("jwt");
      state.appLoaded = true;
      state.isLoggedIn = false;
    },
    logoutAccount(state) {
      state.image = "";
      state.isLoggedIn = false;
      state.userId = "";
      window.localStorage.removeItem("jwt");
    },
    setNewImage(state, { payload }: PayloadAction<string>) {
      state.image = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<ILogginSuccess>) => {
        window.localStorage.setItem("jwt", payload.token);
        state.appLoaded = true;
        state.userId = payload.userId;
        state.isLoggedIn = true;
        state.image = payload.image;
      }
    );
  },
});

const { reducer, actions } = loginSlice;

export const {
  checkCurrentSuccess,
  checkCurrentFail,
  logoutAccount,
  setNewImage,
} = actions;

export default reducer;
