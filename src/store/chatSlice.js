import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Selector to get chats data
const getChatsData = (state) => state.chats.chatsData;

// Memoized selector to get user chats
export const getUserChats = createSelector([getChatsData], (chatsData) => {
  return Object.values(chatsData).sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
});

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chatsData: {},
  },
  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = { ...action.payload.chatsData };
    },
  },
});

export const { setChatsData } = chatSlice.actions;
export default chatSlice.reducer;
