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
    addProgressData: (state, action) => {
      const { progresskey, progressData } = action.payload;

      state.progressData = {
        ...state.progressData,
        [progresskey]: progressData,
      };
    },
  },
});
export const { setProgressData, addProgressData } = progressSlice.actions;
export default progressSlice.reducer;
