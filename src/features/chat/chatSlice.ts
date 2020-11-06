import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import friendApi from "app/api/friend";
import messageApi from "app/api/message";
import { IErrorFromServer } from "app/models/error";
import { IFindFriend } from "app/models/friend";
import {
  IMessageContent,
  IMessageItem,
  IResponseGetMessageContent,
} from "app/models/message";
import { IUserRecive } from "app/models/user";
import { showError } from "app/notifycation/notify";
import { history } from "index";
import { IMessageRecive } from "./types/message";

type ChatState = {
  chats: IMessageItem[];
  idUserRecive?: string;
  conversationId?: string;
  contentChat: IMessageContent[];
  isSearch: Boolean;
  listFriendSearch: IFindFriend[];
  userSelect: IUserRecive;
};

const initialState: ChatState = {
  chats: [],
  idUserRecive: undefined,
  conversationId: undefined,
  contentChat: [],
  isSearch: false,
  listFriendSearch: [],
  userSelect: {
    username: "",
    birthday: "",
    email: "",
    image: "",
    sex: false,
  },
};

export const getListMessage = createAsyncThunk(
  "chat/getListMessage",
  async (None, { rejectWithValue }) => {
    try {
      const data = await messageApi.getListMessage();
      return data;
    } catch (error) {
      let err = error as IErrorFromServer;
      showError(err.description);
      return rejectWithValue(err);
    }
  }
);

export const getContentMessageByConvId = createAsyncThunk(
  "chat/getContentMessageByConvId",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const data = await messageApi.getContentMessage(conversationId);
      return data;
    } catch (error) {
      let err = error as IErrorFromServer;
      return rejectWithValue(err);
    }
  }
);

export const findFriendByKeyword = createAsyncThunk(
  "chat/findFriendByKeyword",
  async (keyword: string, { rejectWithValue }) => {
    try {
      const data = await friendApi.findByKeyword(keyword);
      history.push("/friend");
      return data;
    } catch (error) {
      let err = error as IErrorFromServer;
      showError(err.description);
      return rejectWithValue(err);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, { payload }: PayloadAction<IMessageRecive>) {
      if (state.idUserRecive && state.idUserRecive) {
        if (state.idUserRecive === payload.idSend) {
          state.contentChat.push({
            content: payload.content,
            isSend: false,
            time: new Date(),
          });
        } else {
          state.contentChat.push({
            content: payload.content,
            isSend: true,
            time: new Date(),
          });
        }
      }
      const index = state.chats.findIndex(
        (x) => x.conversationId === payload.conversationId
      );
      if (index === -1) {
        const name = payload.username + "";
        state.chats.push({
          username: name,
          content: "",
          conversationId: payload.conversationId,
          isSend: false,
          userFriendId: payload.idSend,
          image: payload.image,
        });
      } else {
        let value = { ...state.chats[index] };
        value.content = payload.content;
        const time = new Date();
        value.time = time.toISOString();
        state.chats[index] = value;
      }
    },
    setIdUserRecive(state, { payload }: PayloadAction<string>) {
      if (state.idUserRecive !== payload) {
        state.idUserRecive = payload;
        const index = state.chats.findIndex((x) => x.userFriendId === payload);
        if (index !== -1) {
          const data = state.chats[index];
          state.userSelect = data;
        }
      }
    },
    onAddUserChat(state, { payload }: PayloadAction<IMessageItem>) {
      state.chats.push(payload);
    },
    setWaitForAdd(state, { payload }: PayloadAction<string>) {
      const index = state.listFriendSearch.findIndex((x) => x.id === payload);
      if (index !== -1) {
        state.listFriendSearch[index].isSend = true;
      }
    },
    clearAllState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getListMessage.fulfilled,
      (state, { payload }: PayloadAction<IMessageItem[]>) => {
        state.chats = payload;
      }
    );
    builder.addCase(
      getContentMessageByConvId.fulfilled,
      (state, { payload }: PayloadAction<IResponseGetMessageContent>) => {
        state.contentChat = payload.messageContent.reverse();
        state.conversationId = payload.conversationId;
        state.isSearch = false;
      }
    );
    builder.addCase(
      findFriendByKeyword.fulfilled,
      (state, { payload }: PayloadAction<IFindFriend[]>) => {
        state.isSearch = true;
        state.listFriendSearch = payload;
      }
    );
  },
});

const { reducer, actions } = chatSlice;

export const {
  addMessage,
  setIdUserRecive,
  setWaitForAdd,
  onAddUserChat,
  clearAllState,
} = actions;

export default reducer;
