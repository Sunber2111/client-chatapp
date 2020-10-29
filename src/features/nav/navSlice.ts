import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriendNotVerify, IReciveInvitation } from "app/models/friend";

type NavState = {
  listFriendNotVerify: IFriendNotVerify[];
};

const initialState: NavState = {
  listFriendNotVerify: [],
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    onAddToListFriendNotVerify(
      state,
      { payload }: PayloadAction<IFriendNotVerify[]>
    ) {
      state.listFriendNotVerify = payload;
    },
    onAcceptFriend(state, { payload }: PayloadAction<string>) {
      const index = state.listFriendNotVerify.findIndex(
        (x) => x.friendId === payload
      );
      if (index !== -1) {
        state.listFriendNotVerify.splice(index, 1);
      }
    },
    onAddNewItem(state, { payload }: PayloadAction<IReciveInvitation>) {
      state.listFriendNotVerify.push({
        friendId: payload.friendId,
        image: payload.image,
        username: payload.username,
        userFriendId: payload.idUserSend,
      });
    },
    removeFriend(state, { payload }: PayloadAction<string>) {
      const index = state.listFriendNotVerify.findIndex(
        (x) => x.friendId === payload
      );
      if (index !== -1) {
        state.listFriendNotVerify.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {},
});

const { reducer, actions } = navSlice;

export const {
  onAddToListFriendNotVerify,
  onAcceptFriend,
  onAddNewItem,
  removeFriend
} = actions;

export default reducer;
