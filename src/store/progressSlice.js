import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    progressData: {},
  },
  reducers: {
    setProgressData: (state, action) => {
      state.progressData = { ...action.payload.progressData };
    },
  },
});
export const setProgressData = progressSlice.actions.setProgressData;
export default progressSlice.reducer;
