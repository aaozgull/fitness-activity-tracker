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
      let existingCalendarActivity = state.calendarActivitiesData[calendarId];
      // Check if existing activities array exists and is an array
      if (
        !existingCalendarActivity ||
        !Array.isArray(existingCalendarActivity)
      ) {
        // If it doesn't exist or is not an array, initialize it as an empty array
        existingCalendarActivity = [];
      }
      // Push the new activity to the array
      existingCalendarActivity.push(activity);
      // Update the state with the modified activities array
      state.calendarActivitiesData[calendarId] = existingCalendarActivity;
    },
    updateCalendarActivity: (state, action) => {
      const { calendarId, activityId, isChecked } = action.payload;
      const existingCalendarActivities = state.calendarActivitiesData;
      let existingCalendarActivity = existingCalendarActivities[calendarId];

      // Check if existing activities array exists and is an array
      if (
        !existingCalendarActivity ||
        !Array.isArray(existingCalendarActivity)
      ) {
        // If it doesn't exist or is not an array, initialize it as an empty array
        existingCalendarActivity = [];
      }

      // Find the index of the activity with the matching activityId
      const activityIndex = existingCalendarActivity.findIndex(
        (activity) => activity.id === activityId
      );

      // If the activity is found, update its isChecked property
      if (activityIndex !== -1) {
        // Create a copy of the activity object to avoid mutating the original state
        const updatedActivity = { ...existingCalendarActivity[activityIndex] };
        updatedActivity.isChecked = isChecked;

        // Update the activity in the activities array
        existingCalendarActivity[activityIndex] = updatedActivity;

        // Update the state with the modified activities array
        existingCalendarActivities[calendarId] = existingCalendarActivity;
        state.calendarActivitiesData = existingCalendarActivities;
      }
    },
  },
});
export const {
  setCalendarActivitiesData,
  addCalendarActivity,
  updateCalendarActivity,
} = calendarActivitiesSlice.actions;

export default calendarActivitiesSlice.reducer;
