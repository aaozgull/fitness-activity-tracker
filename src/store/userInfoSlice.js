// userInfoSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfoData: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfoData: (state, action) => {
      state.userInfoData = action.payload.userInfoData;
    },
    updateLoggedInUserInfoData: (state, action) => {
      state.userInfoData = {
        ...state.userInfoData,
        ...action.payload.newInfoData,
      };
    },
  },
});
export const updateLoggedInUserInfoData =
  userInfoSlice.actions.updateLoggedInUserInfoData;
export const setUserInfoData = userInfoSlice.actions.setUserInfoData;
export default userInfoSlice.reducer;
