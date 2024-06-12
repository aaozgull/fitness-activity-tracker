import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
    isNewRegistration: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.isNewRegistration = payload.newRegistration;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state, action) => {
      state.didTryAutoLogin = true;
    },
    setIsNewRegistration: (state, action) => {
      state.isNewRegistration = false;
    },
    logout: (state, action) => {
      state.token = null;
      state.userData = null;
      state.didTryAutoLogin = false;
      state.isNewRegistration = false;
    },
    updateLoggedInUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload.newData };
    },
  },
});
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export const setIsNewRegistration = authSlice.actions.setIsNewRegistration;

export const authenticate = authSlice.actions.authenticate;
export const updateLoggedInUserData = authSlice.actions.updateLoggedInUserData;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;
