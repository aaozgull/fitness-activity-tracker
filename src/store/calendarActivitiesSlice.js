import { createSlice } from "@reduxjs/toolkit";

const calendarActivitiesSlice = createSlice({
  name: "activities",
  initialState: {
    calendarActivitiesData: {},
  },
  reducers: {
    setCalendarActivitiesData: (state, action) => {
      const existingCalendarActivities = state.calendarActivitiesData;
      const { calendarId, calendarActivitiesData } = action.payload;
      existingCalendarActivities[calendarId] = calendarActivitiesData;
      state.calendarActivitiesData = existingCalendarActivities;
    },
    addCalendarActivity: (state, action) => {
      const { calendarId, activity } = action.payload;
      if (!activity.id) {
        activity.id = Date.now().toString();
      }
      /*  */ console.log(
        "Before adding activity1:",
        state.calendarActivitiesData[calendarId]
      );
      /*  if (!Array.isArray(state.calendarActivitiesData[calendarId])) { */
      if (!state.calendarActivitiesData[calendarId]) {
        state.calendarActivitiesData[calendarId] = {};
      }
      console.log(
        "Before adding activity:",
        state.calendarActivitiesData[calendarId]
      );
      state.calendarActivitiesData[calendarId] = {
        ...state.calendarActivitiesData[calendarId],
        [activity.id]: activity,
      };

      console.log(
        "After adding activity:",
        state.calendarActivitiesData[calendarId]
      );
    },
    updateCalendarActivity: (state, action) => {
      const { calendarId, activityId, isChecked } = action.payload;
      const calendarActivities = state.calendarActivitiesData;
      let existingCalendarActivities = calendarActivities[calendarId];

      for (const key in existingCalendarActivities) {
        if (existingCalendarActivities[key].id === activityId) {
          existingCalendarActivities[key].isChecked = isChecked;
        }
      }

      calendarActivities[calendarId] = existingCalendarActivities;
      state.calendarActivitiesData = calendarActivities;
      //}
    },
  },
});
export const {
  setCalendarActivitiesData,
  addCalendarActivity,
  updateCalendarActivity,
} = calendarActivitiesSlice.actions;

export default calendarActivitiesSlice.reducer;
