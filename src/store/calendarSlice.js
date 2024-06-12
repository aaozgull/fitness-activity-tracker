import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    calendarData: {},
  },
  reducers: {
    setCalendarData: (state, action) => {
      state.calendarData = { ...action.payload.calendarData };
    },
    /*  updateCalendarData: (state, action) => {
      const existingCalendar = state.calendarData;

      const { date, calendarData } = action.payload;

      existingCalendar[date] = calendarData;

      state.calendarData = existingCalendar;
    },

    removeCalendarData: (state, action) => {
      const { date } = action.payload;
      delete state.calendarData[date];
    }, */
  },
});
export const { setCalendarData } = calendarSlice.actions;
export default calendarSlice.reducer;
